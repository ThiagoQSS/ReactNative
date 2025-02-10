import React, { useState } from "react"
import {
    View, Text, TextInput, TouchableOpacity,
    Vibration, Pressable, Keyboard, FlatList,
} from "react-native"
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form() {

    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("Preencha o peso e a altura")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErrorMessage] = useState(null)
    const [imcList, setImcList] = useState([])

    function imcCalculator() {
        let heightFormat = height.replace(",", ".")
        let weightFormat = weight.replace(",", ".")
        let totalImc = (weightFormat / (heightFormat * heightFormat)).toFixed(2)
        setImcList ((arr) => [...arr, {id: new Date().getTime(), imc: totalImc}])
        setImc(totalImc)
    }

    function verificationImc() {
        if (imc == null) {
            Vibration.vibrate()
            setErrorMessage("* campo obrigatório")
        }
    }

    function validationImc() {
        console.log(imcList)
        if (weight != null && height != null) {
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu IMC é igual a:")
            setTextButton("Calcular novamente")
            setErrorMessage(null)
        } else {
            setImc(null)
            verificationImc()
            setTextButton("Calcular")
            setMessageImc("Preencha o peso e a altura")
        }
    }

    return (
        <View style={styles.formContext}>
            {
                imc == null
                ?
                <Pressable style={styles.form}
                    onPress={Keyboard.dismiss}>
                    <Text style={styles.formLabel}>Altura</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setHeight}
                        value={height}
                        placeholder="Ex. 1.75"
                        keyboardType="numeric"
                    />
                    <Text style={styles.formLabel}>Peso</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setWeight}
                        value={weight}
                        placeholder="Ex. 75.365"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        style={styles.buttonCalculator}
                        onPress={() => {
                            validationImc()
                        }}>
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </Pressable>
                :
                <View style={styles.exhibitionResultImc}>
                    <ResultImc messageImc={messageImc} resultImc={imc} />
                    <TouchableOpacity
                        style={styles.buttonCalculator}
                        onPress={() => {
                            validationImc()
                        }}>
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
            }
            <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.listImcs} 
            data={[...imcList].reverse()}
            keyExtractor={(item) => {item.id}}
            renderItem={({item}) => {
                return (
                    <Text style={styles.resultImcItem}>
                        <Text style={styles.textResultItemList}>Resultado Imc = </Text>
                        {item.imc}
                    </Text>
                )
            }}
            />
        </View>
    );
}