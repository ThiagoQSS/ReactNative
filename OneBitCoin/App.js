import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';

import CurrentPrice from './src/components/CurrentPrice';
import HistoryGraphic from './src/components/HistoryGraphic';
import QuotationList from './src/components/QuotationsList';


function convertTimestamp(timestamp, timezone) {
	// Calcula o deslocamento de GMT-03:00 em milissegundos
	const offset = -timezone * 60 * 60 * 1000; // -3 horas em milissegundos

	// Adiciona o deslocamento ao timestamp original para obter o timestamp em GMT
	const gmtTimestamp = timestamp - offset;

	return gmtTimestamp;
}

function url(qtdDays) {
	const date = new Date();
	let endDate = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		0,
		0,
		0
	).getTime();
	endDate = convertTimestamp(endDate, -3);
	const startDate = endDate - (qtdDays - 1) * 86400000;
	return `https://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start=${startDate}&end=${endDate}`
}


async function getListCoins(url = "") {
	try {
		let list = [];
		if (url !== "") {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`Erro na requisição: ${ response.status }`)
			}

			const json = await response.json();

			list = json.data.map((item) => {
				const date = item.date.split("T")[0];

				const formattedDate = date.split("-").reverse().join("/");

				return {
					data: formattedDate,
					valor: item.priceUsd,
				};
			});
		}
		const responseToday = await fetch(
			"https://api.coincap.io/v2/assets/bitcoin/"
		);

		if (!responseToday.ok) {
			throw new Error(`Erro na requisição: ${ responseToday.status }`);
		}

		const jsonToday = await responseToday.json();

		const priceToday = jsonToday.data.priceUsd;
		const dateToday = new Date().toLocaleDateString("pt-BR");

		list.push({
			data: dateToday,
			valor: priceToday,
		});

		// list = list.reverse();

		return list;
	} catch (error) {
		console.error("Erro ao obter ou processar os dados: ", error);
		return [];
	}
}

export default function App() {

	const [coinList, setCoinsList] = useState([])
	const [coinsGraphicList, setCoinsGraphicsList] = useState([0])
	const [days, setDays] = useState(10)
	const [price, setPrice] = useState(0)

	function updateDay(number) {
		setDays(number)
	}

	function priceCotation() {
		let lastNum = coinsGraphicList[coinsGraphicList.length - 1]
		setPrice(parseFloat(parseFloat(lastNum).toFixed(2)))
	}

	useEffect(() => {
		getListCoins(url(days)).then((data) => {
			const formattedData = data.map((item) => item.valor)
			setCoinsGraphicsList(formattedData)
			setCoinsList(data)
		})
	}, [days]);

	useEffect(() => {
		let lastNum = coinsGraphicList[coinsGraphicList.length - 1]
		setPrice(parseFloat(parseFloat(lastNum).toFixed(2)))
	}, [coinsGraphicList]);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				backgroundColor='#f50d41'
				barStyle="dark-content"
			/>
			<CurrentPrice lastCotation={price}/>
			<HistoryGraphic infoDataGraphic={coinsGraphicList} />
			<QuotationList filterDay={updateDay} listTransactions={coinList} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000',
		alignItems: 'center',
		paddingTop: Platform.OS === "android" ? 40 : 0 //impede de subir demais
	},
});
