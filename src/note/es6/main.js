import React from "react"
import ReactDOM from "react-dom"
import styles from "../sass/main.scss"

class App extends React.Component {
    render() {
console.log('styles',styles);
        return (
            <table className={styles.table}>
                <tr>
                    <td className={styles.td}>1</td>
                    <td className={styles.td}>2</td>
                </tr>
            </table>
        )
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));