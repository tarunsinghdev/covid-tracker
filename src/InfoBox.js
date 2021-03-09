import React from 'react';
import './InfoBox.css';
import { Card, CardContent, Typography } from '@material-ui/core';

const InfoBox = ({ title, active, isRed, cases, total, ...props }) => {
  return (
    <div className="infoBox__container">
      <Card
        onClick={props.onClick}
        className={`infoBox ${active && 'infoBox--selected'} && ${
          isRed && 'infoBox--red'
        }`}
      >
        <CardContent>
          <Typography className="infoBox__title" color="textSecondary">
            {title}
          </Typography>
          <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>
            {cases}
          </h2>
          <Typography className="infoBox__total" color="textSecondary">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoBox;
