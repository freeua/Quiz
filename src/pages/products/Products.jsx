import React, { useEffect, useState } from "react";
import API from "../../lib/axiosConfig";

import styles from "./Products.module.css";
import Layout from "../../components/Layout";
import Button from "../../components/buttons/Button";
import { Link, useHistory, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import getDataFromStorage from "../../lib/getDataFromStorage";

const Products = () => {
  const { locationId, activationId, activationTypeId } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  const history = useHistory();
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (isOnline) {
      (async () => {
        try {
          setLoading(true);
          const response = await API.get(`/location/${locationId}/products`);

          setProducts(response);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      })();
    } else {
      getDataFromStorage(window.location.pathname)
        .then(storedPathResponse => {
          setProducts(storedPathResponse);
        })
        .catch(error => {
          setConnectionError(error.message);
        });
    }
  }, [history, isOnline, locationId]);

  return (
    <Layout styleMain={{ display: "block" }} pageTitle="Products">
      {connectionError ? (
        <p className="connection-error">{connectionError}</p>
      ) : loading ? (
        <Loader />
      ) : !!products.length ? (
        products.map(({ id, images, approved_name, description }) => (
          <div key={id} className={styles.productWrapper}>
            <div className={styles.images}>
              {images &&
                !!images.length &&
                images.map((imageSrc, idx) => (
                  <img
                    key={imageSrc}
                    style={{
                      top: idx * 11 + "%",
                      left: images.length === 1 ? "25%" : idx * 20 + "%",
                      zIndex: idx,
                    }}
                    className={styles.image}
                    src={imageSrc}
                    alt=""
                  />
                ))}
            </div>
            {/* <div className={styles.description}>
              <p className={styles.name}>{approved_name}</p>
              <p className={styles.info} dangerouslySetInnerHTML={{ __html: description }}></p>
            </div> */}
            <Link
              to={`/activation-types/${activationTypeId}/activations/${activationId}/location/${locationId}/product/${id}`}>
              <button className={styles.redButton}>Click here for more info</button>
            </Link>
          </div>
        ))
      ) : (
        <div className={styles.noProducts}>No products here</div>
      )}
      <div className={styles.buttons}>
        <div className={styles.navButtons}>
          <Link
            to={`/activation-types/${activationTypeId}/activations/${activationId}/quizzes/${locationId}`}>
            <Button type="submit" text={"TAKE QUIZ"} />
          </Link>
          <Link to="/">
            <Button type="button" text={"RETURN TO START"} />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
