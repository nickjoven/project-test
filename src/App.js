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

// [
//   'C3',
//   'C#3',
//   'D3',
//   'D#3',
//   'E3',
//   'F3',
//   'F#3',
//   'G3',
//   'G#3',
//   'A3',
//   'A#3',
//   'B3',
//   'C4',
//   'C#4',
//   'D4',
//   'D#4',
//   'E4',
//   'F4',
//   'F#4',
//   'G4',
//   'G#4',
//   'A4',
//   'A#4',
//   'B4',
//   'C5'
// ]

const noteMap = ([
  'C1',
  'E1',
  'G1',
  'B1',
  'C3',
  'C#3',
  'D3',
  'D#3',
  'E3',
  'F3',
  'F#3',
  'G3',
  'G#3',
  'A3',
  'A#3',
  'B3',
  'C4',
  'C#4',
  'D4',
  'D#4',
  'E4',
  'F4',
  'F#4',
  'G4',
  'G#4',
  'A4',
  'A#4',
  'B4',
  'C5'
].reverse())

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

    Tone.Transport.bpm.value = 88
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
      <h2>{(position + 32 - 3) % 32}</h2>
      <button onClick={start}>Play</button>
      <button onClick={logSequence}>Sequence</button>
      <button onClick={configLoop}>H</button>
      <div className='centered-content'>
        <div className='row-container'>
          <div className='piano-roll'>
            {noteMap.map((note) => {
              return (
                <div className={'roll-note' + ' ' + (note.includes('#') ? 'accidental': '' )} key={note} >
                  {note}
                </div>
              )
            })}
          </div>
          <div className='grid-container'>
            {sequence.map((row, rowIndex) => {
              return (
                <Row key={rowIndex} rowIndex={rowIndex} row={row} play={play} toggleNote={toggleNote} position={position}/>
                )
              })}
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
