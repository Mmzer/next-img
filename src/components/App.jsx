import React,{Component} from 'react';
import nextImg from '../utils/nextImg';

import './app.scss';
import defaultImg from '../../assets/default.jpg';

const imgs = [
    '../../img/big-0.jpg',
    '../../img/big-1.jpg',
    '../../img/big-2.jpg',
    '../../img/big-3.jpg',
    '../../img/big-4.jpg',
    '../../img/big-5.jpg'
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
    }

    componentDidMount() {
     	nextImg(imgs,(imgSrc) => {
     		let img = document.querySelector('img[rel="'+imgSrc+'"]');
     		img.src = imgSrc;
     		console.log(imgSrc + ' loaded');
     	}, () => {
     		console.log('all imgs loaded !');
     	});
    }

    render() {
        return (
			<div className="next-img-demo">
				<ul>
					{imgs.map((img,index) => {
						return <li key={'img' + index}><img ref={'img'+index} src={defaultImg} rel={img}/></li>;
					})}
				</ul>
			</div>
		);
    }
}

export default App;