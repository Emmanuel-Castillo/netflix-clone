import Header from "@/components/Header";
import Banner from "@/components/Banner";
import requests from "@/utils/request";
import { Movie } from "@/typings";
import Row from "@/components/Row";
import useAuth from "@/hooks/useAuth";
import { constSelector, useRecoilValue } from "recoil";
import { modalState } from "@/atoms/modalAtom";
import Modal from "@/components/Modal";
import Plans from "@/components/Plans";
import { Product, getProducts } from "@stripe/firestore-stripe-payments";
import payments from "@/lib/stripe";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  products: Product[]
}

// provide types; typescript provides intellisense
const Home = ({ netflixOriginals,
trendingNow,
topRated,
actionMovies,
comedyMovies,
horrorMovies,
romanceMovies,
documentaries,
products, 
}: Props) => {
  console.log(products)
  const {logout, loading} = useAuth()
  const showModal = useRecoilValue(modalState)
  const subscription = false

  if(loading || subscription === null) return null

  if(!subscription) return <Plans/>
  return (
    <>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
        <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List Component */}
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal/>}
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  console.log(payments)
  const products = await getProducts(payments , {
    includePrices: true,
    activeOnly: true
  })
  .then((results) => results)
  .catch((error) => console.log(error.message))

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);


  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products,
    },
  }
}
