import React, { Fragment } from 'react'
import { View, Text, Image } from 'react-native'
import styles from "./style"

export default function QuotationItem(props) {

    let number = parseFloat(props.valor).toFixed(3)

    return (
        <View style={styles.mainContent}>
            <View style={styles.contextLeft}>
                <View style={styles.boxLogo}>
                    <Image 
                    style={styles.logoBitcoin}
                    source={require("../../../img/redbitcoinpng.png")}
                    />
                    <Text style={styles.dayCotation}>{props.data}</Text>
                </View> 
            </View>
            <View style={styles.contextRight}>
                <Text style={styles.price}>$ {number}</Text>
            </View>
        </View>
    )
}