import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './Styles';
import { FirebaseProvider } from './Firebase';
import { StackActions } from '@react-navigation/native';

export const SelectUserScreen = ({route, navigation}) => {

    const setUser = (userName) => {
        route.params.onUserSelect(userName);
        const popAction = StackActions.pop(1);
        navigation.dispatch(popAction);
    }

    const [household, setHousehold] = useState('');

    useEffect(() => {
        if (!household) {
            console.log("Getting a household")
            getHousehold();
        }
    });

    const getHousehold = async () => {
        const { householdId } = route.params
        console.log(householdId);
        const hh = await FirebaseProvider.getInstance().retrieveHousehold(householdId);
        console.log(hh);
        setHousehold(hh);
    }

    let familyRows;
    if (household) {
        familyRows = household.familyMembers.map(
            familyMember =>
            <View
                style={selectUserRow.familyrow}
            >
                <TouchableOpacity
                    style={styles.userButton}
                    onPress={() => setUser(`${familyMember.firstName} ${familyMember.lastName}`)}
                >
                    <Text style={styles.regularText}>
                        {familyMember.firstName} {familyMember.lastName}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={selectUserRow.container}>
            <>{familyRows}</>
        </View>
    );
}

const selectUserRow = StyleSheet.create({
    familyrow: {
        flexDirection: 'row',
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    container: {
        height: '100%',
        backgroundColor: '#f7f9fc',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
});