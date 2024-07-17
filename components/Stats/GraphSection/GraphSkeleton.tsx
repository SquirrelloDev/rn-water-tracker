import {VictoryBar} from "victory-native";
import {useEffect, useState} from "react";
type MockDataVals = {x: number, y: number}

const initiMockDataAnimationVals: MockDataVals[] = Array(7).fill(1).map((item, idx) => ({
    x: idx,
    y: item * Math.floor(Math.random() * 2000)
}))
const randomizeValues = (values: MockDataVals[]): MockDataVals[] => {
  return values.map(item => ({
      x: item.x,
      y: Math.floor(Math.random() * 2000)
  }))
}
export function GraphSkeleton() {
    const [mockData, setMockData] = useState(initiMockDataAnimationVals)
    useEffect(() => {
        const interval = setInterval(() => {
            setMockData(prevState => randomizeValues(prevState))
        }, 1500)
        return () => {
            clearInterval(interval)
        }
    }, [])
    return (
        <VictoryBar data={mockData} x={'x'} y={'y'} style={{data: {fill: '#6a6a6a'}}} animate={{onLoad: {duration: 1}, duration: 300 ,easing: 'linear'}} cornerRadius={{bottom: 8, top: 8}}/>
    );
}