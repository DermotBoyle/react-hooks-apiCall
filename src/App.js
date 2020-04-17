import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios'


function App() {

  const [results, setResults] = useState([])
  const [query, setQuery]= useState('react hooks')
  const [loading, setLoading] = useState(false)
  const [error,setError] = useState(null);
  const searchInputRef = useRef()

  useEffect(() => {
  getResults(); 
  }, [])


  const handleSearch = event => {
    event.preventDefault();
    getResults();
  }

  const handleClearSearch = () => {
    setQuery('');
    searchInputRef.current.focus();
  }

  const getResults = async () => {
    setLoading(true);
    try{
    const response = await axios.get
      (`http://hn.algolia.com/api/v1/search?query=${query}`);
     setResults(response.data.hits);
    } catch (err) {
      setError(err)
    }
     setLoading(false)
    }

  return (
    <>
    <form onSubmit={handleSearch}>
    <input type="text" className="query" ref={searchInputRef} value={query} onChange={event => setQuery(event.target.value)}/>
    <button type="submit">search</button>
    <button type="button" onClick={handleClearSearch}>Clear</button>
    </form>
    { !loading ?
     <ul>
 {results.map(result => (  
<li key={result.objectID}>
 <a href={result.url}>{result.title} {result.objectID}</a>
</li>
 ))}
 </ul>
: "we're getting the data y'all"}
{error && <p>{error.message}</p>}
    </>
  );
}

export default App;
