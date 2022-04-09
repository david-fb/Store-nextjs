import styles from './index.module.scss';
import { useRouter } from 'next/router';

export default function({ alert, handleClose, destination }) {
    const router = useRouter();
    if(alert && alert?.autoClose && handleClose) {
        setTimeout(() => {
            handleClose();
            if(destination) router.push(destination);
        }, 3000);
    }
    return (
        <div className={styles["ConfirmAlert-container"]}>
            <div className={styles["ConfirmAlert"]}>
                <h2>{alert?.message}</h2>
                <svg className={styles["checkmark"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className={styles["checkmark__circle"]} cx="26" cy="26" r="25" fill="none"/><path className={styles["checkmark__check"]} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
            </div>
        </div>
    )
}