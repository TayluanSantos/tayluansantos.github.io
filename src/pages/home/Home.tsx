import { useEffect, useState } from 'react'
import CardCriticas from '../../components/cards/cardcriticas/CardCriticas'
import CardFilmes from '../../components/cards/cardfilmes/CardFilmes'
import CardNoticia from '../../components/cards/cardnoticia/CardNoticia'
import Carrossel from '../../components/carrossel/Carrossel'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
import CarrosselCartaz from '../../components/carrossel/CarrosselCartaz'

interface MovieType {
	poster_path: string
	title: string
	vote_average: number
}

function Home() {
	const [movies, setMovies] = useState<MovieType[]>([])
	const [upcomingMovies, setUpcomingMovies] = useState<MovieType[]>([])

	const getTrendMovies = async () => {
		await axios({
			method: 'get',
			url: 'https://api.themoviedb.org/3/trending/movie/day',
			params: {
				api_key: 'a0893bf64ffda98a803dcaf75c7928d5',
				language: 'pt-BR',
			},
		}).then((response) => {
			setMovies(response.data.results)
		})
	}

	useEffect(() => {
		getTrendMovies()
	}, []) // ✅ corrigido

	const getUpComingMovies = () => {
		axios({
			method: 'get',
			url: 'https://api.themoviedb.org/3/movie/upcoming',
			params: {
				api_key: 'a0893bf64ffda98a803dcaf75c7928d5',
				language: 'pt-BR',
			},
		}).then((response) => {
			setUpcomingMovies(response.data.results)
		})
	}

	useEffect(() => {
		getUpComingMovies()
	}, []) // ✅ corrigido

	console.log(JSON.stringify(upcomingMovies))

	return (
		<>
			<section className='text-white'>
				<Carrossel />
			</section>

			<section className='flex justify-center px-4' id='alta'>
				<div className='container mx-auto py-7'>
					<h2 className=' text-yellow-500 text-2xl my-3'>Em Alta</h2>

					{movies.length === 0 && (
						<ThreeDots
							visible={true}
							height="80"
							width="80"
							color="#eab308"
							radius="9"
							ariaLabel="three-dots-loading"
							wrapperStyle={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						/>
					)}

					<div className='grid grid-cols-5 gap-5'>
						{movies.map((movie) => (
							<CardFilmes
								key={movie.title} // ✅ boa prática
								foto={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
								nome={movie.title}
								nota={movie.vote_average}
							/>
						))}
					</div>
				</div>
			</section>

			<section>
				<div className='container mx-auto py-7'>
					<h2 className=' text-yellow-500 text-2xl my-3'>Críticas</h2>
					<div className='flex justify-between gap-x-4'>
						<CardCriticas
							foto='https://ik.imagekit.io/iixrkkdfp/movie-blog/fDmuPREB3yTrelyYugguEine5Y1.jpg?updatedAt=1727719220585'
							genero='Animação'
							titulo='A Evolução dos Vilões e a Comédia Afiada em Meu Malvado Favorito 2'
						/>
						<CardCriticas
							foto='https://ik.imagekit.io/iixrkkdfp/movie-blog/ll1msvrkLWWl3g20bgN7g2ua3JA.jpg?updatedAt=1727719523739'
							genero='Animação'
							titulo='Reflexões sobre Humanidade e Natureza em Robô Selvagem'
						/>
						<CardCriticas
							foto='https://ik.imagekit.io/iixrkkdfp/movie-blog/iAhxbQ9uXo8B0cMvcPEqIuQY36Y.jpg?updatedAt=1727719685126'
							genero='Ação'
							titulo='A Fúria dos Ventos: Ação e Adrenalina em Twisters'
						/>
						<CardCriticas
							foto='https://ik.imagekit.io/iixrkkdfp/movie-blog/qKS7y4zh999wGuCkXz7T3N7aLay.jpg?updatedAt=1727719841911'
							genero='Ficção científica, Terror'
							titulo='Substância: A Nova Fronteira da Ficção Científica e do Suspense'
						/>
					</div>
				</div>
			</section>

			<section className='flex justify-center px-4' id='noticias'>
				<div className='container mx-auto py-7'>
					<h2 className=' text-yellow-500 text-2xl my-3'>Notícias</h2>
					<div className='flex flex-col gap-y-3'>
						<CardNoticia
							foto='https://ik.imagekit.io/iixrkkdfp/movie-blog/gsVC7HMf4VR2XFOyqjTSklY2Tms.jpg?updatedAt=1727484443727'
							titulo='Pobres Criaturas: Uma Fantasia Gótica de Libertação e Identidade'
							descricao='O tão aguardado filme "Pobres Criaturas", dirigido por Yorgos Lanthimos, finalmente chegou às telonas, encantando o público com sua narrativa ousada e visual deslumbrante'
						/>
						<CardNoticia
							foto='https://ik.imagekit.io/iixrkkdfp/movie-blog/w7RDIgQM6bLT7JXtH4iUQd3Iwxm.jpg?updatedAt=1727484442711'
							titulo='Pulp Fiction: O Filme Que Redefiniu a Narrativa do Cinema Moderno'
							descricao='Pulp Fiction", dirigido por Quentin Tarantino, é um ícone do cinema dos anos 90, conhecido por sua narrativa não linear e diálogos memoráveis.'
						/>
						<CardNoticia
							foto='https://ik.imagekit.io/iixrkkdfp/movie-blog/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg?updatedAt=1727484443644'
							titulo='DivertidaMente 2: Uma Nova Jornada pelas Emoções'
							descricao='Na aguardada sequência de "Divertida Mente", a Pixar nos leva de volta à mente de Riley, agora uma adolescente enfrentando os desafios da vida adulta.'
						/>
					</div>
				</div>
			</section>

			<section className='flex justify-center' id='cartaz'>
				<div className='container mx-auto py-7'>
					<h2 className=' text-yellow-500 text-2xl my-3'>Em Cartaz</h2>
					<CarrosselCartaz />
				</div>
			</section>
		</>
	)
}

export default Home