
import { useState, useEffect} from "react"
import "./App.css"

function App() {
  const [countries,setcountrise] = useState([])
  const [word,setWord] = useState('')
  const [dataFilter] = useState(["name","capital","region"])

  
  useEffect(()=> {
    fetch("https://restcountries.com/v2/all")
    .then(res => res.json())
    .then(data => setcountrise(data)) 
  },[])

  const searchCountries = (countries) => {
    return countries.filter((item) => {
      return dataFilter.some((filter)=> {
        return item[filter] && item[filter].toString().toLowerCase().indexOf(word.toLowerCase()) > -1;
      })
    })
  }
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  console.log(word)
  return (
    <div className="container"> 
      <div className="search-container">
        <label htmlFor="search-form">
          <input type="text" 
          className="search-input" 
          placeholder="ค้นหาข้อมูลประเทศที่คุณต้องการ (เมืองหลวง,ชื่อประทศ, ภูมิภาค)"
          value={word}
          onChange={((event)=>setWord(event.target.value))}
           />
        </label>
      </div>
      <ul className="row">
      {searchCountries(countries).map((item,key) => {
        return (
            <li key={key}>
              <div className="card">
                <div className="card-title">
                  <img src={item.flag} alt={item.name} />
                </div>
                <div className="card-body">
                  <div className="card-description">
                      <h2>{item.name}</h2>
                      <ol className="card-list">
                        <li>ประชากร : <span>{formatNumber(item.population)} คน</span> </li>
                        <li>ภูมิภาค : <span>{item.region}</span> </li>
                        <li>ภูมิภาค : <span>{item.capital}</span></li>
                      </ol>
                  </div>

                </div>
              </div> 
            </li>

        )
      })}
      </ul>
    </div>
  )
}

export default App
