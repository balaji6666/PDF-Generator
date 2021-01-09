
import React, {useState} from 'react';

import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Alert
} from 'react-native';


import * as Print from 'expo-print';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";


const App = () => {
  const [filePath, setFilePath] = useState('');

  const products = [
    {
      productID : 1,
      productName : 'Iphone'
    },
    {
      productID : 2,
      productName:'OnePlus'
    }
  ];
//
// var name = 'balaji';
//


const header = `<!DOCTYPE html>
<html lang="en-US">

<head>
    <title>Invoice</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        button {
            height: 30px;
            width: 15%;
            background-color: rgb(18, 128, 188);
            color: white;
            margin: 0% 20% 1% 43%;
        }

        table {
            text-align: left;
            border-collapse: collapse;
            width: 50%;
            margin-left: 25%;
            margin-right: 25%;
            margin-bottom: 25px;
        }

        th,
        td {
            padding: 8px;
            text-align: left;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2
        }

        th {
            background-color: #4CAF50;
            color: white;
        }
    </style>
</head>
`


var body = `

<body>
    <img src="https://freedesignfile.com/upload/2018/06/Cartoon-truck-design-vector.jpg"
        style="width:350px;height:150px;margin-bottom:10px;margin-left:40% ;margin-top:10px" alt="Truck" />
    <h1 style="margin-left:40%;color:maroon;font-family:'OpenSans',sans-serif;">Logistics App</h1>
    <table>
        <thead>
            <tr>
                <th>Col</th>
                <th>Details</th>
            </tr>
        </thead>
        <tbody>




`


for(var index = 0;index<products.length;index++)
{

      var content = `<tr>
          <td>${products[index].productID}</td>
          <td>${products[index].productName}</td>
      </tr>`

      body = body + content;
}

body = body
+
 `
</tbody>
</table>
</body>`;

const footer = `</html>`;


var htmlContent = header+body+footer;



  const createAndSavePDF = async (html) => {
    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri);
      } else {
        const permission = await MediaLibrary.requestPermissionsAsync();

        if (permission.granted) {
          await MediaLibrary.createAssetAsync(uri);
          setFilePath(uri);

          Alert.alert(
            'PDF saved',
            'File saved in ' + uri,
            [
              {
                text: 'Ask me later',
                onPress: () => console.log('Ask me later pressed')
              },
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
          );



        }



      }

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>
        Example to Make PDF in React Native from HTML Text
      </Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={(html) => {createAndSavePDF(htmlContent)}}>
          <View>
            <Image
              //We are showing the Image from online
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/pdf.png',
              }}
              style={styles.imageStyle}
            />
            <Text style={styles.textStyle}>Create PDF</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.textStyle}>{filePath}</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    fontSize: 18,
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  imageStyle: {
    width: 150,
    height: 150,
    margin: 5,
    resizeMode: 'stretch',
  },
});
