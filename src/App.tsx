import Timeline from './components/timeline/Timeline';
import styles from './App.module.scss';
import { generateAllCategoryTimelines } from './data/dataGenerators';

const App = () => {
	return (
		<div className={styles.app}>
			<Timeline intervals={generateAllCategoryTimelines()} />
		</div>
	);
};

export default App;
