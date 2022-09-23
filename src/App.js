import { useState, useEffect } from 'react'
import * as Tone from 'tone'
import './App.css';
import Row from './components/Row'

const stepsPerSegment = 4
const segmentsPerSequence = 8
const stepsPerSequence = stepsPerSegment * segmentsPerSequence

const sampler = new Tone.Sampler({
  'C1': '/kick.wav',
  'E1': '/snare.wav',
  'G1': '/ophh.wav',
  'B1': '/clhh.wav',
  'C4': '/cw_sound39.wav'
}).toDestination();

const play = (e) => {
  sampler.triggerAttackRelease(e.target.name)
}

const noteMap = (['C1', 'E1', 'G1', 'B1', 'A3', 'B3', 'D4', 'E4', 'G4'].reverse())

const makeGrid = (noteArray) => {
  let rows = []
  noteArray.forEach((note) => {
    makeRow(note, rows)
  })
  return rows
}

const makeRow = (note, rows) => {
  let row = []
  for (let i = 0; i < stepsPerSequence; i++) {
    let _note = {
      note: note,
      isActive: false,
    }
    row.push(_note)
  }
  rows.push(row)
}

let step = 0

const App = () => {
  const [grid, setGrid] = useState(makeGrid(noteMap))
  const [sequence, setSequence] = useState(makeGrid(noteMap))
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [position, setPosition] = useState(0)
  
  const start = () => {
    if (!started) {
      Tone.start()
      Tone.getDestination().volume.rampTo(-10, 0.001)
      configLoop()
      setStarted(true)
    }
    if (playing) {
      Tone.Transport.stop()
      setPlaying(false)
    } else {
      Tone.Transport.start()
      setPlaying(true)
    }
  }


  const configLoop = () => {
    const repeat = (time) => {
      sequence.forEach((row) => {
        let note = row[step]
        if (note.isActive) {
          sampler.triggerAttackRelease(note.note, "16n", time)
        }
      })
      step = (step + 1) % 32
      setPosition(step)
    }

    Tone.Transport.bpm.value = 80
    Tone.Transport.scheduleRepeat(repeat, "16n")
  }

  const logSequence = () => {
    console.log(sequence)
    console.log(position)
  }

  const toggleNote = (rowIndex, noteIndex) => {
    let sequenceCopy = [...sequence]
    sequenceCopy[rowIndex][noteIndex].isActive = !sequenceCopy[rowIndex][noteIndex].isActive
    setSequence(sequenceCopy)
  }
  

  return (
    <div className='App'>
      <h2>{position}</h2>
      <button onClick={start}>Play</button>
      <button onClick={logSequence}>Sequence</button>
      <div className='row-container'>
        {sequence.map((row, rowIndex) => {
          return (
            <Row key={rowIndex} rowIndex={rowIndex} row={row} play={play} toggleNote={toggleNote} position={position}/>
            )
        })}
        </div>
    </div>
  );
}

export default App;
