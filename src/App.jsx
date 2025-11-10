import {useEffect, useState} from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/filterInput.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const res = await fetch(
                    `${API_URL}?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
                );
                if (!res.ok) throw new Error("Failed to fetch data");
                const data = await res.json();
                console.log(data);
                setCoins(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCoins();
    }, [limit]);

    const filteredCoins = coins.filter((coin) => {
        return coin.name.toLowerCase().includes(filter.toLowerCase()) || coin.symbol.toLowerCase().includes(filter.toLowerCase());
    })
    return (
        <div>
            <h1>🚀 Crypto Dash</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <FilterInput filter={filter} onFilterChange={setFilter}/>
            <LimitSelector limit={limit} onLimitChange={setLimit}/>
            {!loading && !error && (
                <main className="grid">
                    {filteredCoins.length === 0 ? (
                        <p>No coins found</p>
                    ) : filteredCoins.map((coin) => (
                        <CoinCard key={coin.id} coin={coin}/>
                    ))}
                </main>
            )}
        </div>
    );
};

export default App;
