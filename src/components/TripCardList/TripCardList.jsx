import React from "react";
import "./TripCardList.css";
import TripCard from "../TripCard/TripCard";
import { defaultTrips } from "../../utils/utils";

function renderTrips() {
  return defaultTrips.map((trip) => (
    <TripCard
      key={trip.key}
      duration={trip.duration}
      image={trip.image}
      imageLabel={trip.imageLabel}
      title={trip.title}
      infoTextArr={trip.infoTextArr}
      tripTimeArr={trip.tripTimeArr}
      onlinePrice={trip.onlinePrice}
      offlinePrice={trip.offlinePrice}
    />
  ));
}

export default function TripCardList() {
  return <ul className="tripCardList">{renderTrips()}</ul>;
}
