import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../Component/Banner";
import { Main } from "next/document";
import Card from "../Component/Card";
import coffeeShops from "../data/coffee-stores.json";

// getStaticProp should be placed outside the function as it returns props that we need to add in below function
export async function getStaticProps(context) {
  console.log("Hi we are in getStaticProps");
  return {
    props: { coffeeShops }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  console.log("props are -", props);

  const handleOnBannerBtnClick = () => {
    console.log("banner button clicked");
  };
  return (
    <div className="{styles.container}">
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="allows you to discover coffee stores"
        ></meta>
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText="View nearby store"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image src="/hero.png" width={700} height={400} />
        </div>

        {coffeeShops.length > 0 && (
          <>
            <h2 className={styles.heading2}>Nagpur coffee stores</h2>

            <div className={styles.cardLayout}>
              {props.coffeeShops.map((coffeeShop) => (
                <Card
                  key={coffeeShop.id}
                  name={coffeeShop.name}
                  imgUrl={coffeeShop.imgUrl}
                  href={`/coffeeStore/${coffeeShop.id}`}
                  className={styles.card}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
