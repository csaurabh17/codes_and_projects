import React from 'react';
import connect from '../store/connect'
import { category_action } from '../actions'
class GalleryHome extends React.Component {
    e
    // state = {
    //     categories : []
    // }

    componentDidMount() {
        debugger
        this.props.dispatch(category_action());

    }

    render() {

        const { categories_data } = this.props;
        return (
            <div className="card-list">
                <div className="container">
                    <h1 className="page-title">Collections</h1>
                    <div className="row">
                        {
                            categories_data.map((category) => {
                                return (
                                    <div className="col-md-4" key={category.id}>
                                        <div className="card category-card">
                                            <img className="card-img-top" src={category.img} alt="Card cap" />
                                            <div className="card-body">
                                                {/* <h6 className="card-subtitle mb-0 text-muted">Whole Apartment &#183; Bratislava</h6> */}
                                                <h5 className="card-title big-font">{category.name}</h5>
                                                <p className="card-text">{category.quote}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }



                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories_data: state.categories_data
    }
}

export default connect(mapStateToProps)(GalleryHome);