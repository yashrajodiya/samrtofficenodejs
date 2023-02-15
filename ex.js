const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const XLSX = require('xlsx');
const multer = require("multer");
const path = require("path");
const app = express()


const connection =  mysql.createConnection({
    host: "localhost",
    user: "pramukh_siddhit1",
    password: "siddhi@@2012",
    database: "pramukh_sidhhit1",
});

app.get("/test", (req, resp) => {
      resp.send("This Api Is working");
});
app.use(express.json());

const SECRET = 'secretkey';

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  connection.query(
    `SELECT * FROM users WHERE username = '${username}'`,
    (error, results) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }

      if (!results.length) {
        return res.status(400).json({ message: 'User not found' });
      }

      const user = results[0];

      if (user.password !== password) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      const token = jwt.sign({ id: user.id, usertype: user.type,usernames: user.username,idd:user.id}, SECRET);
      const val = results[0]['type'];

      res.json([{type:user.type,token:token,usernames:user.username,idd:user.id}]);
    }
  );
});


const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, SECRET

    );

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};





let newData = [];
let expencs = [];
const storage = multer.diskStorage({
  destination: './upload/file',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({
  storage: storage,  
})

app.use('/profile', express.static('upload/file'));

app.post('/addData/:id', upload.single('profile'), (req, res) => {

    function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  } 
    run();
  async function run() {
    await delay(10000);
  
    const workbook = XLSX.readFile(`upload/file/${req.file.filename}`);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    let data = XLSX.utils.sheet_to_json(worksheet);
  
    
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const scriptName = item.ScriptName.split(" ")[0];
    
      if (scriptName == 'IO' || scriptName == 'EO') {
        const intru = item.ScriptName.split(" ")[0];
        const cp = item.ScriptName.split(" ")[1];
        const stock = item.ScriptName.split(" ")[2];
        const expiry = item.ScriptName.split(" ")[3];
        const Strike = item.ScriptName.split(" ")[4];
    
        const newItem = {
          Date: item.Date,
          ClientID: item.ClientID,
          Exchange: item.Exchange,
          ScriptName: stock,
          intrus: intru,
          cps: cp,
          stocks: stock,
          expirys: expiry,
          Strikes: Strike,
          qbf: item['B.F. Qty'],
          rbf: item['B.F. Rate'],
          valbf: item['B.F. Value'],
          BuyQty: item.BuyQty,
          BuyRate: item.BuyRate,
          BuyAmount: item.BuyAmount,
          SaleQty: item.SaleQty,
          SaleRate: item.SaleRate,
          SaleAmount: item.SaleAmount,
          NetQty: item.NetQty,
          NetRate: item.NetRate,
          NetAmount: item.NetAmount,
          ClosingPrice: item.ClosingPrice,
          Booked: item.Booked,
          Notional: item.Notional,
          Total: item.Total, 
    
        };
        newData.push(newItem);
    
      }
      else if (scriptName == 'IF' || scriptName == 'EF') {
        const intru = item.ScriptName.split(" ")[0];
        const stock = item.ScriptName.split(" ")[1];
        const expiry = item.ScriptName.split(" ")[2];
    
    
        const newItem = {
          Date: item.Date,
          ClientID: item.ClientID,
          Exchange: item.Exchange,
    
          ScriptName: stock,
          intrus: intru,
          expirys: expiry,
          qbf: item['B.F. Qty'],
          rbf: item['B.F. Rate'],
          valbf: item['B.F. Value'],
          BuyQty: item.BuyQty,
          BuyRate: item.BuyRate,
          BuyAmount: item.BuyAmount,
          SaleQty: item.SaleQty,
          SaleRate: item.SaleRate,
          SaleAmount: item.SaleAmount,
          NetQty: item.NetQty,
          NetRate: item.NetRate,
          NetAmount: item.NetAmount,
          ClosingPrice: item.ClosingPrice,
          Booked: item.Booked,
          Notional: item.Notional,
          Total: item.Total,
    
        };
        newData.push(newItem);
      } else if (scriptName == scriptName) {
        const newItem = {
          Date: item.Date,
          ClientID: item.ClientID,
          Exchange: item.Exchange,
          ScriptName: scriptName,
          intrus: '',
          expirys: '',
          qbf: item['B.F. Qty'],
          rbf: item['B.F. Rate'],
          valbf: item['B.F. Value'],
          BuyQty: item.BuyQty,
          BuyRate: item.BuyRate,
          BuyAmount: item.BuyAmount,
          SaleQty: item.SaleQty,
          SaleRate: item.SaleRate,
          SaleAmount: item.SaleAmount,
          NetQty: item.NetQty,
          NetRate: item.NetRate,
          NetAmount: item.NetAmount,
          ClosingPrice: item.ClosingPrice,
          Booked: item.Booked,
          Notional: item.Notional,
          Total: item.Total,
        };
        newData.push(newItem);
      } else if (scriptName == 'CGST' || scriptName == 'SGST' || scriptName == 'STAMP DUTY' || scriptName == 'CLEARING CHARGES' || scriptName == 'ROUNDING' || scriptName == 'SEBI FEES' || scriptName == 'TOC NSE Exchange' || scriptName == 'STT') {
        const newItem = {
          Date: item.Date,
          ClientID: item.ClientID,
          Exchange: item.Exchange,
    
          ScriptName: item.ScriptName,
    
    
          Total: item.Total,
    
        };
        expencs.push(newItem)
      } 

      else {
      }

    }

    console.log(newData);

    const clientIDs = [...new Set(newData.map(item => item.ClientID))];

 console.log(expencs);

  
 clientIDs.forEach((course) => {
   connection.query(`SELECT * FROM users WHERE username = '${course}'`, (error, results) => {
     if (error) {
       console.error('Error querying database: ' + error.stack);
       return;
     }
 
     if (results.length > 0) {
       console.log(`Course "${course}" already exists in the database`);
     } else {
       connection.query(`INSERT INTO users (username,password,type) VALUES ('${course}','123','user')`, (error, results) => {
         if (error) {
           console.error('Error inserting into database: ' + error.stack);
           return;
         }
         console.log(`Course "${course}" added to the database`);
       });
     }
   });
 });
   
 newData.forEach(data => {
      const sql = `INSERT INTO user_data (admin_id, Date,ClientID,Exchange,ScriptName,intrus,cps,stocks,expirys,Strikes,qbf,rbf,valbf,BuyQty,BuyRate,BuyAmount,SaleQty,SaleRate,SaleAmount,NetQty,NetRate,NetAmount,ClosingPrice,Booked,Notional,Total) VALUES ('${req.params.id}','${data.Date}','${data.ClientID}','${data.Exchange}','${data.ScriptName}','${data.intrus}','${data.cps}','${data.stocks}','${data.expirys}','${data.Strikes}','${data.qbf}','${data.rbf}','${data.valbf}','${data.BuyQty}','${data.BuyRate}','${data.BuyAmount}','${data.SaleQty}','${data.SaleRate}','${data.SaleAmount}','${data.NetQty}','${data.NetRate}','${data.NetAmount}','${data.ClosingPrice}','${data.Booked}','${data.Notional}','${data.Total}')`;
      
      connection.query(sql, function(err, result) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Data inserted: ${data.ClientID} ${data.ScriptName}`);
      });
    });  

expencs.forEach(data => {
      const sql = `INSERT INTO expence (admin_id, Date,ClientID,ScriptName,Total) VALUES ('${req.params.id}','${data.Date}','${data.ClientID}','${data.ScriptName}','${data.Total}')`;
      
      connection.query(sql, function(err, result) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Data inserted: ${data.ClientID} ${data.ScriptName}`);
      });
    });  

   newData = []; 
   data = [];
   expencs=[];
  res.send("as")
}
});


const v = [];

app.post('/user/:val', verifyToken, (req, res) => {
  if (req.params.val == 'admin') {
    connection.query(
      `SELECT * FROM user_data WHERE admin_id = ${req.user.id}`,
      (error, results) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
        const desiredDate = req.body.Date;
        
        const filteredEntries = results.filter((entry) => entry.Date === desiredDate);
        res.send(filteredEntries);
        v.push(results);
         
      });
  } else {

    const query = `SELECT * FROM user_data WHERE ClientID = ?`;
    const values = [req.user.usernames];

    connection.query(
      query, values,
      (error, results) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
      
        
        const desiredDate = req.body.Date;
        
        const filteredEntries = results.filter((entry) => entry.Date === desiredDate);
        res.send(filteredEntries);
        v.push(results);

      });
  }
});


app.post('/expence/:val', verifyToken, (req, res) => {
  if (req.params.val == 'admin') {
    connection.query(
      `SELECT * FROM expence WHERE admin_id = ${req.user.id}`,
      (error, results) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
        const desiredDate = req.body.Date;
        
        const filteredEntries = results.filter((entry) => entry.Date === desiredDate);
        res.send(filteredEntries);
         
      });
  } else {

    const query = `SELECT * FROM expence WHERE ClientID = ?`;
    const values = [req.user.usernames];

    connection.query(
      query, values,
      (error, results) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
      
        
        const desiredDate = req.body.Date;
        
        const filteredEntries = results.filter((entry) => entry.Date === desiredDate);
        res.send(filteredEntries);

      });
  }
});



const port = 4500;
app.listen(4500);


