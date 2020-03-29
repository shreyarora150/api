function update_data() {
  
  var ss = SpreadsheetApp.getActive()
 
  var raw_data_json = UrlFetchApp.fetch("https://api.covid19india.org/raw_data.json");
  var time_series_json = UrlFetchApp.fetch("https://api.covid19india.org/data.json");
  var travel_history_json = UrlFetchApp.fetch("https://api.covid19india.org/travel_history.json")  
  
  var ts_data = JSON.parse(time_series_json)
  var raw_data = JSON.parse(raw_data_json)
  var travel_data = JSON.parse(travel_history_json)["travel_history"]
   
  var ts = ts_data["cases_time_series"]
  var data = raw_data["raw_data"]
  var state_data = ts_data["statewise"]
  var key_vals = ts_data["key_values"]
  var tested = ts_data["tested"]
  
  
  Logger.log("raw data length : " + raw_data["raw_data"].length.toString())
  Logger.log("time series data length : " + ts.length.toString())
  Logger.log("state wise data length : " + state_data.length.toString())
  Logger.log("Delta data length : " + key_vals.length.toString())
  Logger.log("tested data length : " + tested.length.toString())
  Logger.log("travel data length : " + travel_data.length.toString())
  
  var data_sets = [data,ts,state_data,tested,key_vals,travel_data]
  var sheets = ["Raw Data","Time-series","state-wise","Tested","Key-values(Delta from last update)","Travel history"]
  
  for (var i =0;i<6;i++)
  {
    var ds = data_sets[i]
    var sheet = ss.getSheetByName(sheets[i])
    
    var headers = []
    headers[0] = Object.keys(ds[0])
    Logger.log(headers[0]) 
    
    sheet.getRange(1,1,1,headers[0].length).setValues(headers)
    var vals = []
    for (var x = 0; x< ds.length ;x++)
    {  
      var row_data = []
      for (var h = 0; h< headers[0].length ; h++)
      {
        row_data[h] = ds[x][headers[0][h]]
      }
      vals[x] = row_data
    }
    sheet.getRange(2,1,ds.length,headers[0].length).setValues(vals)
  
  }
  
}

