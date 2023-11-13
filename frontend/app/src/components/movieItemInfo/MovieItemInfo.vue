<script setup lang="ts">
import { Genre } from '../../types/baseInfoTypes';
import { UseConvertDuration } from '../../hooks/UseConvertDuration'
import Star from '../../assets/Star.vue'
import { useMovieItem } from '../../stores/movieItem'
import MovieItemActors from '../movieItemActors/MovieItemActors.vue'


const movieStore = useMovieItem()

type Date = number | null | undefined

function renderGenres(genres: Genre[]): string {
    const genresToString = genres.map((genre) => genre.text.toLowerCase())
    return genresToString.join(', ');
}

function renderDate(year: Date, month: Date, day: Date): string {
    if (typeof year === 'number' && typeof month === 'number' && typeof day === 'number') {
        return `${day}-${month > 9 ? month : '0' + month}-${year}`;
    }
    return '';
}

const releaseData = renderDate(
    movieStore.movieItemData?.results.releaseDate?.year,
    movieStore.movieItemData?.results.releaseDate?.month,
    movieStore.movieItemData?.results.releaseDate?.day
);
</script>?

<template>
    <div class="movieItemContainerInfo" v-if="movieStore.movieItemData">
        
        <div class="movieItemInnerContainerInfo">
            <div class="movieItemInfoTitleRating">
                <h2>{{ movieStore.movieItemData.results.titleText.text }}</h2>
                <div class="movieItemInfoRating">
                    <span>{{ movieStore.movieItemData.results.ratingsSummary.aggregateRating }}</span>
                    <Star />
                </div>
            </div>

            <div class="movieItemInfoDateTimeGenres">
                <div class="movieItemInfoDate movieItemInfoDateTimeGenresItem">Release date: <span>{{ releaseData }}</span>
                </div>
                <div class="movieItemInfoGenres movieItemInfoDateTimeGenresItem">Genres: <span>{{
                    renderGenres(movieStore.movieItemData.results.genres.genres) }}</span></div>
                <div class="movieItemInfoTime movieItemInfoDateTimeGenresItem">Duration: <span>{{
                    UseConvertDuration(movieStore.movieItemData.results.runtime.seconds) }}</span></div>
            </div>

            <div class="movieItemInfoDescribe">
                <p>{{ movieStore.movieItemData.results.plot.plotText.plainText }}</p>
            </div>
            <MovieItemActors />
        </div>
    </div>
</template>

<style scoped lang="scss">
.movieItemContainerInfo {
    color: #fff;
    display: flex;
    flex-direction: column;
    width: 70%;
    display: flex;
    align-items: center;
    font-size: 18px;

    .movieItemInnerContainerInfo {
        width: 90%;

        .movieItemInfoTitleRating {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;

            h2 {
                margin: 0;
                font-size: 30px;
            }

            .movieItemInfoRating {
                display: flex;
                justify-content: center;
                align-items: center;

                span {
                    margin-right: 7px;
                }
            }
        }

        .movieItemInfoDateTimeGenres {
            .movieItemInfoDateTimeGenresItem {
                margin-bottom: 15px;
                font-weight: 600;

                span {
                    font-weight: 400;
                }
            }
        }
    }

}
</style>