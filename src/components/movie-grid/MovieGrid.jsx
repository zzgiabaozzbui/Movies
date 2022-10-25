import React, {useState, useEffect, useCallback} from 'react';

import './movie-grid.scss';

import tmdbApi, {movieType,tvType} from '../../api/tmdbApi';

import {useParams, useHistory} from 'react-router';

import MovieCard from '../movie-card/MovieCard';
import { category } from '../../api/tmdbApi';

import OutlineButton from '../button/Button';
import Input from '../input/Input';
import Button from '../button/Button';

const MovieGrid = props => {

    const [items, setItems] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const {keyword} = useParams();

    useEffect(() =>{
        const getList = async () => {
            let response = null;

            if(keyword === undefined) {
                const params = {};
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMovieList(movieType.upcoming, {params});
                        break;
                    default:
                        response = await tmdbApi.getMovieList(tvType.popular, {params});

                }
            } else {
                const params = {
                    query: keyword
                };
                response = await tmdbApi.search(props.category, {params});
            }
            setItems(response.results);
            setTotalPage(response.total_pages);
        }
        getList();
    },[props.category,keyword]);

    const loadMore = async () =>{
        let response = null;

        if(keyword === undefined) {
            const params = {
                page: page + 1 
            };
            switch(props.category) {
                case category.movie:
                    response = await tmdbApi.getMovieList(movieType.upcoming, {params});
                    break;
                default:
                    response = await tmdbApi.getMovieList(tvType.popular, {params});

            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            };
            response = await tmdbApi.search(props.category, {params});
        }
        setItems([...items,...response.results]);
        setPage(page + 1);
    }

  return (

    <>
    
        <div className="section mb-3">
            <MovieSearch category={props.category} keyword={keyword}></MovieSearch>
        </div>
        <div className="movie-grid">
            {
                items.map((item,i)=> 
                <MovieCard
                    category={props.category}
                    item={item}
                    key={i}
                >

                </MovieCard>)
            }
        </div>
        {
            page < totalPage ? (
                <div className="movie-grid__loadmore">
                    <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
                </div>    
            ) : null
        }
    </>
  )
}

const MovieSearch = props => {

    const history = useHistory();

    const [keyword,setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if(keyword.trim().length > 0){
                history.push(`${(category[props.category])}/search/${keyword}`);
            }
        },
        [keyword,props.category,history]
    );

    useEffect(() => {
      const enterEvent = (e) => {
        e.preventDefault();
        goToSearch();
        // if(e.keycode === 13) {
        //     goToSearch();
        // }
      }
      document.addEventListener('keyup', enterEvent);
    
      return () => {
        document.removeEventListener('keyup', enterEvent);
      }
    }, [keyword,goToSearch]);
    

    return(
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyboard"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            ></Input>
            <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}

export default MovieGrid