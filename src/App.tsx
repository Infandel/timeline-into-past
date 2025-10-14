import { useState } from 'react';
import Timeline from './components/timeline/Timeline';
import styles from './App.module.scss';
import data from './data/timelineData';

const App = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className={styles.app}>
			<Timeline intervals={data} activeIndex={activeIndex} onChangeIndex={(i) => setActiveIndex(i)} />
		</div>
	);
};

export default App;
