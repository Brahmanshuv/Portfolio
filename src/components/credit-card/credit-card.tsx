import React from 'react';
import styled from 'styled-components';

interface CreditCardProps {
  company?: string;
  cardNumber?: string;
  cardHolder?: string;
  cardExpiration?: string;
  className?: string;
}

const CreditCard = ({
  company = "MASTERCARD",
  cardNumber = "9759 2484 5269 6576",
  cardHolder = "BRUCE WAYNE",
  cardExpiration = "12/24",
  className = ""
}: CreditCardProps) => {
  return (
    <StyledWrapper className={className}>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p className="heading_8264">{company}</p>
            <svg className="logo" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={72} height={72} viewBox="0 0 48 48">
              <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" /><path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" /><path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z" />
            </svg>

            <p className="number">{cardNumber}</p>
            <p className="valid_thru">VALID THRU</p>
            <p className="date_8264">{cardExpiration}</p>
            <p className="name">{cardHolder}</p>
          </div>
          <div className="flip-card-back">
            <div className="strip" />
            <div className="mstrip" />
            <div className="sstrip">
              <p className="code">***</p>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .flip-card {
    background-color: transparent;
    width: 480px;
    height: 308px;
    perspective: 2000px;
    color: white;
    font-size: 2em;
  }

  .heading_8264 {
    position: absolute;
    letter-spacing: .2em;
    font-size: 0.5em;
    top: 2em;
    left: 18.6em;
  }

  .logo {
    position: absolute;
    top: 6.8em;
    left: 11.7em;
  }

  .chip {
    position: absolute;
    top: 2.3em;
    left: 1.5em;
  }

  .contactless {
    position: absolute;
    top: 3.5em;
    left: 12.4em;
  }

  .number {
    position: absolute;
    font-weight: bold;
    font-size: .6em;
    top: 8.3em;
    left: 1.6em;
  }

  .valid_thru {
    position: absolute;
    font-weight: bold;
    top: 635.8em;
    font-size: .01em;
    left: 140.3em;
  }

  .date_8264 {
    position: absolute;
    font-weight: bold;
    font-size: 0.5em;
    top: 13.6em;
    left: 3.2em;
  }

  .name {
    position: absolute;
    font-weight: bold;
    font-size: 0.5em;
    top: 16.1em;
    left: 2em;
  }

  .strip {
    position: absolute;
    background-color: black;
    width: 15em;
    height: 1.5em;
    top: 2.4em;
    background: repeating-linear-gradient(
      45deg,
      #303030,
      #303030 10px,
      #202020 10px,
      #202020 20px
    );
  }

  .mstrip {
    position: absolute;
    background-color: rgb(255, 255, 255);
    width: 8em;
    height: 0.8em;
    top: 5em;
    left: .8em;
    border-radius: 2.5px;
  }

  .sstrip {
    position: absolute;
    background-color: rgb(255, 255, 255);
    width: 4.1em;
    height: 0.8em;
    top: 5em;
    left: 10em;
    border-radius: 2.5px;
  }

  .code {
    font-weight: bold;
    text-align: center;
    margin: .2em;
    color: black;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front, .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0,0,0,0.2);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 2rem;
  }

  .flip-card-front {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -1px 0px inset;
    background-color: #171717;
  }

  .flip-card-back {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -1px 0px inset;
    background-color: #171717;
    transform: rotateY(180deg);
  }
`;

export { CreditCard };
