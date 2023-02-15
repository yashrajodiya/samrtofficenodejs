

// const express = require('express')

// const fs = require('fs');
// const register = require('./login');
// const login = require('./login');

// // var data1 ; 
// var val 
// fs.readFile('file.txt', 'utf-8', (err, data) => {
//   if (err) throw err;

//   const lines = data.split('\n');
// const jsonData = [];

// for (const line of lines) {
//   var fields = line.split(',');
//   const obj = {
//     "TradeNo": fields[0],
//     "TradeStatus": fields[1],
//     "InstName": fields[2],
//     "Symbol": fields[3],
//     "Expiry": fields[4],
//     "Strike": fields[5],
//     "OptionType": fields[6],
//     "SecurityName": fields[7],
//     "BookType": fields[8],
//     "BookTypeName": fields[9],
//     "MarketType": fields[10],
//     "UserId": fields[11],
//     "BranchId": fields[12],
//     "BuySell": fields[13],
//     "Qty": parseFloat(fields[14]),
//     "Price": fields[15],
//     "pro/cli": fields[16],
//     "ClientAc": fields[17],
//     "participantCode": fields[18],
//     "Open/Close": fields[19],
//     "cover/uncover": fields[20],
//     "EntryTime": fields[21],
//     "Modify DateTime": fields[22],
//     "OrderNo": fields[23],
//     "CPid": fields[24]
//   };
//   jsonData.push(obj);
// }


// app.get('/:id', function (req, res) {
//     const  data = jsonData.filter(obj => obj.UserId === req.params.id);

// //   arr = arr.map(obj => {
// //     for (const key in obj) {
// //       obj[key] = obj[key];
// //     }
// //     return obj;
// //   });

// const result = [];
// const map = new Map();

//     for (const item of data) {
//         if (!map.has(item.SecurityName)) {
//           map.set(item.SecurityName, 0);
//         }
//         map.set(item.SecurityName,item['BuySell'] == '1'? map.get(item.SecurityName) + item.Qty:map.get(item.SecurityName) - item.Qty);
//       }

//       for (const [SecurityName, Qty] of map) {
//         result.push({ SecurityName, Qty });
//       }


//     for (const item of data) {
//         if (!map.has(item.SecurityName)) {
//           map.set(item.SecurityName, 0);
//         }
//         map.set(item.SecurityName, map.get(item.SecurityName) - item.Qty);
//       }

//       for (const [SecurityName, Qty] of map) {
//         result.push({ SecurityName, Qty });
//       }

//       for (const item of data) {
//     }

//     res.send(result)
//   })



//   app.get('/val/:id', function (req, res) {
//     const filteredObjects = jsonData.filter(obj => obj.UserId === req.params.id);
//         res.send(filteredObjects)
//       })

//   app.listen(3000)
//   console.log('Server started on port 3000');


// });
// for (let i = 0; i < newData.length; i++) {
    //   const sql = `
    //     SELECT * FROM user_data WHERE admin_id = ? AND Date = ?;
    //   `;
      
    //   const params = [req.params.id, newData[i].Date];
    
    //   connection.query(sql, params, (error, results) => {
    //     if (error) throw error;
    
    //     if (results.length > 0) {
    //       const sql = `
    //         DELETE FROM user_data WHERE admin_id = ? AND Date = ?;
    //       `;
    
    //       connection.query(sql, params, (error, results) => {
    //         if (error) throw error;
    
    //         const sql = `
    //           INSERT INTO user_data (admin_id, Date,ClientID,Exchange,ScriptName,intrus,cps,stocks,expirys,Strikes,qbf,rbf,valbf,BuyQty,BuyRate,BuyAmount,SaleQty,SaleRate,SaleAmount,NetQty,NetRate,NetAmount,ClosingPrice,Booked,Notional,Total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    //         `; 
    //         const params = [req.params.id,newData[i].Date,newData[i].ClientID,newData[i].Exchange,newData[i].ScriptName,newData[i].intrus,newData[i].cps,newData[i].stocks,newData[i].expirys,newData[i].Strikes,newData[i].qbf,newData[i].rbf,newData[i].valbf,newData[i].BuyQty,newData[i].BuyRate,newData[i].BuyAmount,newData[i].SaleQty,newData[i].SaleRate,newData[i].SaleAmount,newData[i].NetQty,newData[i].NetRate,newData[i].NetAmount,newData[i].ClosingPrice,newData[i].Booked,newData[i].Notional,newData[i].Total];
    
    //         connection.query(sql, params, (error, results) => {
    //           if (error) throw error;
    //           console.log(`Inserted new data with name: ${newData[i].ClientID}`);
    //         });
    //       });
    //     } else {

    //       const sql = `
    //       INSERT INTO user_data (admin_id, Date,ClientID,Exchange,ScriptName,intrus,cps,stocks,expirys,Strikes,qbf,rbf,valbf,BuyQty,BuyRate,BuyAmount,SaleQty,SaleRate,SaleAmount,NetQty,NetRate,NetAmount,ClosingPrice,Booked,Notional,Total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    //       `;


    //       const params = [req.params.id,newData[i].Date,newData[i].ClientID,newData[i].Exchange,newData[i].ScriptName,newData[i].intrus,newData[i].cps,newData[i].stocks,newData[i].expirys,newData[i].Strikes,newData[i].qbf,newData[i].rbf,newData[i].valbf,newData[i].BuyQty,newData[i].BuyRate,newData[i].BuyAmount,newData[i].SaleQty,newData[i].SaleRate,newData[i].SaleAmount,newData[i].NetQty,newData[i].NetRate,newData[i].NetAmount,newData[i].ClosingPrice,newData[i].Booked,newData[i].Notional,newData[i].Total];
         
    
    //       connection.query(sql, params, (error, results) => {
            
    //         if (error) throw error;
    //         console.log(`Inserted new data with name: ${newData[i].ClientID}`);
    //       });

    //     }
    //   });
    // }
    
