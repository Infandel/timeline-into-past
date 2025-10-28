import Timeline from './components/timeline/Timeline';
import { generateAllCategoryTimelines } from './data/dataGenerators';

const App = () => {
	return <Timeline intervals={generateAllCategoryTimelines(10)} />;
};

export default App;
