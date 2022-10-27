import React, { useState, useEffect } from "react";
import "./TripCard.css";
import clockImage from "../../images/clock-circular-outline.svg";
import checkMark from "../../images/check-mark.svg";

export default function TripCard({
  duration,
  image,
  imageLabel,
  title,
  infoTextArr,
  tripTimeArr,
  onlinePrice,
  offlinePrice,
}) {
  const [timeItemsToShow, setTimeItemsToShow] = useState([]);
  let arrayForHoldingTimeItems = [];
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 600px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(max-width: 600px)")
      .addEventListener("change", (e) => setIsMobile(e.matches));
    return () => {
      window
        .matchMedia("(max-width: 600px)")
        .removeEventListener("change", (e) => setIsMobile(e.matches));
    };
  }, []);

  function renderInfoItems() {
    return infoTextArr.map((textItem) => (
      <li className="tripCard__info-item">
        <img
          className="tripCard__info-item-image"
          src={checkMark}
          alt="Картинка: галочка"
        />
        <p className="tripCard__info-item-title">{textItem}</p>
      </li>
    ));
  }

  function renderTripTime() {
    if (tripTimeArr.length > 4) {
      return timeItemsToShow.map((timeItem) => (
        <button
          className="tripCard__info-time-button"
          type="button"
          aria-label="Кнопка: Время отправки"
        >
          {timeItem}
        </button>
      ));
    } else {
      return tripTimeArr.map((timeItem) => (
        <button
          className="tripCard__info-time-button"
          type="button"
          aria-label="Кнопка: Время отправки"
        >
          {timeItem}
        </button>
      ));
    }
  }

  function renderLoadMoreButton() {
    return (
      <button
        className="tripCard__info-time-button"
        type="button"
        aria-label="Кнопка: Загрузить еще"
        onClick={handleShowMoreTimes}
      >
        ещё...
      </button>
    );
  }

  function renderLoadLessButton() {
    return (
      <button
        className="tripCard__info-time-button"
        type="button"
        aria-label="Кнопка: Показать меньше"
        onClick={handleShowLessTimes}
      >
        скрыть
      </button>
    );
  }

  useEffect(() => {
    loopWithSlice(0, 3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripTimeArr]);

  function handleShowMoreTimes() {
    loopWithSlice(0, tripTimeArr.length);
  }

  function handleShowLessTimes() {
    loopWithSlice(0, 3);
  }

  const loopWithSlice = (start, end) => {
    const slicedItems = tripTimeArr.slice(start, end);
    if (
      timeItemsToShow[1] === slicedItems[1] ||
      timeItemsToShow.length !== tripTimeArr.length
    ) {
      arrayForHoldingTimeItems = [...slicedItems];
    } else arrayForHoldingTimeItems = [...timeItemsToShow, ...slicedItems];
    setTimeItemsToShow(arrayForHoldingTimeItems);
  };

  function renderTripDuration() {
    return (
      <div className="tripCard__duration-container">
        <img
          className="tripCard__duration-image"
          src={clockImage}
          alt="Картинка: циферблат"
        />
        <p className="tripCard__duration">{duration + " часа"}</p>
      </div>
    );
  }

  function renderOfflinePrice() {
    return (
      <p className="tripCard__price-item">{offlinePrice} &#8381; на причале</p>
    );
  }

  return (
    <li className="tripCard">
      <div className="tripCard__image-container">
        <img className="tripCard__image" src={image.url} alt={image.alt} />
        {imageLabel ? (
          <div className="tripCard__image-label">{imageLabel}</div>
        ) : null}
      </div>
      <div className="tripCard__info-container">
        {isMobile ? renderTripDuration() : null}
        <h2 className="tripCard__title">
          {isMobile ? "АКЦИЯ - " + title : title}
        </h2>
        {!isMobile ? renderTripDuration() : null}
        <ul className="tripCard__info-list">
          {renderInfoItems()}
          <li className="tripCard__info-item">
            <img
              className="tripCard__info-item-image"
              src={checkMark}
              alt="Картинка: галочка"
            />
            <p className="tripCard__info-item-title">Ближайший рейс сегодня</p>
            {!isMobile ? (
              <ul className="tripCard__info-time-container">
                {renderTripTime()}
                {tripTimeArr.length > 4 &&
                timeItemsToShow.length !== tripTimeArr.length
                  ? renderLoadMoreButton()
                  : null}
                {tripTimeArr.length > 4 &&
                timeItemsToShow.length === tripTimeArr.length
                  ? renderLoadLessButton()
                  : null}
              </ul>
            ) : null}
          </li>
          {isMobile ? (
            <ul className="tripCard__info-time-container">
              {renderTripTime()}
              {tripTimeArr.length > 4 &&
              timeItemsToShow.length !== tripTimeArr.length
                ? renderLoadMoreButton()
                : null}
              {tripTimeArr.length > 4 &&
              timeItemsToShow.length === tripTimeArr.length
                ? renderLoadLessButton()
                : null}
            </ul>
          ) : null}
        </ul>
        <div className="tripCard__price-container">
          <div className="tripCard__price-items">
            <p className="tripCard__price-item tripCard__price-item_big">
              {onlinePrice} &#8381;
            </p>
            {offlinePrice ? renderOfflinePrice() : null}
          </div>
          <button
            type="button"
            className="tripCard__details-button"
            aria-label="Кнопка: Подробнее"
          >
            Подробнее
          </button>
        </div>
      </div>
    </li>
  );
}
