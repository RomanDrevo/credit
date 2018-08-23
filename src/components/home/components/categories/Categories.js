import React, {Component} from "react";
import styles from "./Categories.module.scss";
import classnames from "classnames";
import {Link, withRouter} from "react-router-dom";

@withRouter
class Category extends Component {
    render() {
        const {category, match} = this.props;
        let opacityClassName = "";
        const {categoryId} = match.params;

        if(match.path === "/category-benefits/:categoryId") {
            if(categoryId != category.id) {
                opacityClassName = "opacity-3";
            }
        }

        return (
            <div className={`category ${opacityClassName}`}>
                <img src={category.src} alt={category.name}/>

                <div className="name">{category.name}</div>
            </div>

        );
    }


};

const Categories = ({categories}) => {
    return (
        <div className={classnames(styles['categories'])}>
            <ul className={`list-unstyled flex mb0`}>
                {categories.map(x => <Link key={x.id} to={`/category-benefits/${x.id}`}>
                    <li><Category category={x}/></li>
                </Link>)}
            </ul>
        </div>
    );
};

export default Categories;
