import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import coffeeShopsData from "../../data/coffee-stores.json";
import styles from "../../styles/coffee-store.module.css";

export async function getStaticProps({ params }) {
  console.log("Params are", params);
  return {
    props: {
      coffeeShop: coffeeShopsData.find(
        //coffeeShop.id is in json , and find() can only find string or else undefined error
        (coffeeShop) => coffeeShop.id.toString() === params.id // params take the ID information from the router we have implemented below ,router.queue.id
      ),
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  //instead of giving ID one by one , we make id:coffeeShop.id
  const paths = coffeeShopsData.map((coffeeShop) => {
    return {
      params: {
        id: coffeeShop.id.toString(),
      },
    };
  });
  return {
    paths: paths,
    fallback: false, // false or 'blocking'
  };
}

const handleUpvoteButton = () => {
  console.log("handle upvote");
};

const coffeeStore = (props) => {
  const router = useRouter();

  return (
    <div className={styles.layout}>
      <Head>
        <title>{props.coffeeShop.name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href={"/"}>
              <a> Go to index</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{props.coffeeShop.name}</h1>
          </div>
          <Image
            src={props.coffeeShop.imgUrl}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={props.coffeeShop.name}
          />
        </div>
        <div className={styles.col2}>
          <div className={styles.iconWrapper}>
            <Image src="/nearMe.svg" width={24} height={24} />
            <p className={styles.text}>{props.coffeeShop.address}</p>
          </div>

          <div className={styles.iconWrapper}>
            <Image src="/location.svg" width={24} height={24} />
            <p className={styles.text}>{props.coffeeShop.neighbourhood}</p>
          </div>

          <div className={styles.iconWrapper}>
            <Image src="/star.svg" width={24} height={24} />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote it
          </button>
        </div>
      </div>
    </div>
  );
};

export default coffeeStore;
