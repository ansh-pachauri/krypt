import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export default function useFetch({keyword}){
    const [gifUrl, setGifUrl] = useState("");

    const fetchGifs = async()=>{
        try{
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=funny&limit=1`);

            const {data} = await response.json();
            setGifUrl(data[0]?.images?.downsized_medium?.url);
        }catch(error){
            console.log(error);
            setGifUrl("https://media.giphy.com/media/3o7aD2saq5v0x4g9iY/giphy.gif");
        }
    }

    useEffect(()=>{
        if(keyword){
            fetchGifs(keyword);
        }
    }, [keyword]);

    return gifUrl;
}