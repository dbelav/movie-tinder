<script setup lang="ts">
import type { Genre } from '../../types/baseInfoTypes';
import type { DirectorCategory } from '../../types/directors'
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

function renderDirectors(directors: DirectorCategory[] | undefined): string {
    if (directors) {
        const directorsToString = directors.map((director) => director.credits[0].name.nameText.text)
        return directorsToString.join(', ');
    } else {
        return ''
    }

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

const budgetAmount = movieStore.budgetMovieData?.results.productionBudget.budget?.amount

const budgetworldwideGross = movieStore.budgetMovieData?.results.worldwideGross.total?.amount
</script>

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

            <div class="movieItemInfoBody">
                <div class="movieItemInfoDate movieItemInfoBodyItem">
                    Release date: <span>{{ releaseData }}</span>
                </div>
                <div class="movieItemInfoGenres movieItemInfoBodyItem">
                    Genres: <span>{{ renderGenres(movieStore.movieItemData.results.genres.genres) }}</span>
                </div>
                <div class="movieItemInfoTime movieItemInfoBodyItem">Duration:
                    <span>{{ UseConvertDuration(movieStore.movieItemData.results.runtime.seconds) }}</span>
                </div>
                <div class="movieItemInfoBudget movieItemInfoBodyItem" v-if="budgetAmount">
                    Budget: <span>{{ budgetAmount + ' USD' }}</span>
                </div>
                <div class="movieItemInfoFees movieItemInfoBodyItem" v-if="budgetworldwideGross">
                    Worldwide box-office: <span>{{ budgetworldwideGross + ' USD' }}</span>
                </div>
                <div class="movieItemInfoDirector movieItemInfoBodyItem">
                    Directors: <span>{{ renderDirectors(movieStore.directorsMovieData?.results.directors) }}</span>
                </div>
                <MovieItemActors />
            </div>

            <div class="movieItemInfoDescribe">
                <p>{{ movieStore.movieItemData.results.plot.plotText.plainText }}</p>
            </div>
            
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

        .movieItemInfoBody {

            .movieItemInfoBodyItem {
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