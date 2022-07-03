import { renderIntoDocument } from "react-dom/test-utils"

export const addtoCart = (id) => {
    return (dispatch) => {
        dispatch({
            type: "addtoCart",
            payload: id
        })
    }
}

export const removeFromCart = () => {

}