import { useEffect, useState } from "react";
import axios from 'axios';
import Card from "./Card";

const Countries = () => {
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [loop, setLoop] = useState(true);
    const [rangeValue, setRangeValue] = useState(50);
    const [selectedRadio, setSelectedRadio] = useState('');
    const radios = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

    // can be well simplified.
    useEffect(() => {
        if (loop) {
            axios.get('https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag')
            .then(res => {
                setData(res.data);
                setLoop(false);
            });
        }

        if (!loop) {
            const sortCountry = () => {
                const countryObj = Object.keys(data).map(i => data[i]);
                const sortedArray = countryObj.sort((a, b) => b.population - a.population);
                sortedArray.length = rangeValue;
                setSortedData(sortedArray);
            }
    
            sortCountry();
        }
    }, [data, rangeValue]);

    return (
        <div className="countries">
            <div className="sort-container">
                <input type="range" min="1" max="250" value={rangeValue} onChange={e => setRangeValue(e.target.value)} />
                <ul>
                    {radios.map(radio => {
                    return (
                        <li key={radio}>
                            <input type="radio" value={radio} id={radio}  checked={radio === selectedRadio} onChange={e => setSelectedRadio(e.target.value)} />
                            <label htmlFor={radio}>{radio}</label>
                        </li>
                    )  
                    })}
                </ul>
            </div>
            <div className="cancel">
                {selectedRadio && <h5 onClick={() => setSelectedRadio("")}>Annuler recherche</h5>}
            </div>
            <ul className="countries-list">
                {sortedData
                .filter(country => country.region.includes(selectedRadio))
                .map(country => (
                    <Card country={country} key={country.name} />
                ))}
            </ul>
        </div>
    );
};

export default Countries;