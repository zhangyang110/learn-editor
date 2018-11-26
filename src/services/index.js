import config from 'config'
import * as tvapi from './tvapi'

const { prefix } = config

tvapi.ApiClient.instance.basePath = '/api/v3'
tvapi.ApiClient.instance.authentications.Bearer.apiKey = 'bearer ' + window.localStorage.getItem(`${prefix}token`)

export const AuthApi = new tvapi.AuthApi()
export const GamesApi = new tvapi.GamesApi()
export const ImagesApi = new tvapi.ImagesApi()
export const MoviesApi = new tvapi.MoviesApi()
export const PagesApi = new tvapi.PagesApi()
export const ProfileApi = new tvapi.ProfileApi()
export const ReleasesApi = new tvapi.ReleasesApi()
export const SeriesApi = new tvapi.SeriesApi()
export const TemplatesApi = new tvapi.TemplatesApi()
export const UsersApi = new tvapi.UsersApi()
export const VideosApi = new tvapi.VideosApi()
export const RecommendsApi = new tvapi.RecommendsApi()
export const CategorysApi = new tvapi.CategorysApi()
export const SubjectsApi = new tvapi.SubjectsApi()
export const SearchRecommendsApi = new tvapi.SearchRecommendsApi()
export const SubjectSeriesApi = new tvapi.SubjectSeriesApi()
export const FreeSeriesApi = new tvapi.FreeSeriesApi()
export const LeaderBoardsApi = new tvapi.LeaderboardsApi()


export { ApiClient, CommonResponse, Game, Login, Movie, Page, Release, Series, Template, Leaderboard, User ,Video,Recommend,Category,Subject,SearchRecommend,SubjectSeries,FreeSeries} from './tvapi'

