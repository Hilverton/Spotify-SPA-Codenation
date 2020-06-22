import React, { useEffect, useState } from 'react';
import { BsPlayFill, BsVolumeUpFill } from 'react-icons/bs';
import Ink from 'react-ink';
import { useDispatch, useSelector } from 'react-redux';
import { addTrackToPlayer, removeTrackToPlayer } from '../../actions';
import './Track.scss';

const Track = ({ track }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const { playingNowId } = useSelector(state => state.content);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (isPlaying && playingNowId === track.id) {
            setIsPlaying(false);
            dispatch(removeTrackToPlayer());

            return;
        }

        dispatch(addTrackToPlayer(track));

        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (playingNowId === track.id) {
            return;
        }

        setIsPlaying(false);
    }, [playingNowId, track.id]);

    return (
        <div className="track" onClick={handleClick} data-testid="track"> 
            <div className="track__play">
                <div className="track__play__wrapper">
                    <BsPlayFill className="track__play__icon" />
                    <BsVolumeUpFill className="track__play__icon" />
                </div>
            </div>

            <div className="track__info">
                <span className="track__name">{track.name}</span>

                <span className="track__artists">
                    {track.artists.length && track.artists.map(({ name }) => name).join(', ')}
                </span>
            </div>

            <Ink />
        </div>
    )
};

export default Track;

