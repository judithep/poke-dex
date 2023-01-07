import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTrainerGlobal } from "../store/slices/trainer.slice";
import './style/home.css'

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerGlobal(e.target.name.value.trim()));
    e.target.reset();
    navigate("/pokedex");
  };

  return (
    <div className=" container__home">
      <img className="img__home" src="/Home/pokedex.png" alt="" />
      <h1 className="h1__home__title">Hi Trainer!</h1>
      <p className="p__home__name">Give me your name to start</p>
      <form className="form__home__onsubmit" onSubmit={handleSubmit}>
        <input className="input__home__form" type="text" id="name" />
        <button className="btn__home__Start">Start</button>
      </form>
    </div>
  );
};

export default Home;