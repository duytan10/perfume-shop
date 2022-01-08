import React, { FC, useEffect } from 'react' 
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../redux/reducers/root-reducer';
import { clearCart } from '../redux/thunks/cart-thunks';
import { Order } from '../types/types';
import Helmet from './Helmet';

const OrderFinalize: FC = () => {

    const dispatch = useDispatch();
    const order: Partial<Order> = useSelector((state: AppStateType) => state.order.order);

    useEffect(() => {
        dispatch(clearCart());
    }, []);


    return (
        <Helmet title='Thank you'>
            <div className="container text-center mt-5">
                <h2>Thank you for the order!</h2>
                <p>Your order number is: <span>{order.id}</span></p>
            </div>
        </Helmet>
    )
}

export default OrderFinalize
