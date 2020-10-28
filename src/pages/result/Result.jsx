import React from "react";
import styles from "./Result.module.css";
import Layout from "../../components/Layout";
import Exit from "../../components/Exit";
import Button from "../../components/buttons/Button";
import liverCongratulations from "../../static/images/liver_congratulations.png";
import { Redirect, useParams } from "react-router-dom";
import { connect } from "react-redux";

function Result({ result, selectedLocation }) {
  const { locationId, activationId, activationTypeId } = useParams();

  if (!result) return <Redirect to="/" />;

  return (
    <Layout pageTitle="Result">
      <div className={styles.contentWrapper}>
        <div className={styles.congratzWrapper}>
          <div className={styles.heroWrapper}>
            <img src={liverCongratulations} className={styles.hero} alt="Hero" />
            <div className={styles.heroTitle}>Congratulations</div>
          </div>
        </div>
        <p>
          You have answered {result.correct_answers} out of {result.count_answers} questions
          correctly.
        </p>
        {result && result.products && result.products.length ? (
          <>
            <p>Based on your answers, we recommend that you consider the following product/s</p>
            {result.products.map(product => (
              <div key={product.id}>
                <div className={styles.product}>
                  <img
                    className={styles.productImage}
                    src={product.images.length ? product.images[product.images.length - 1] : ""}
                    alt={product.title}
                  />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                    className={styles.productDescription}
                  />
                </div>
                <div className={styles.funFact}>Fun Fact: {product.fun_fact || ""}</div>
              </div>
            ))}
          </>
        ) : (
          <p>Based on your answers, we cannot recommend you any products </p>
        )}
        <div className={styles.buttons}>
          <Button
            text="Restart"
            href={`/activation-types/${activationTypeId}/activations/${activationId}/quizzes/${locationId}`}
          />
          <Button
            text="VIEW MORE PRODUCTS"
            href={`/activation-types/${activationTypeId}/activations/${activationId}/products/${locationId}`}
          />
        </div>
        <img src={result.image_footer || ""} className={styles.actions} alt="" />
        <div className={styles.exit}>
          <Exit />
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = state => ({
  result: state.quiz.result,
  selectedLocation: state.locations.selected,
});

export default connect(mapStateToProps)(Result);
