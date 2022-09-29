import { useState, useEffect } from 'react'
import * as Tone from 'tone'
import './App.css'
import SimpleEditor from './components/SimpleEditor'
import Inputs from './components/Inputs'
import Row from './components/Row'

const stepsPerBeat = 4
const BeatsPerSequence = 8
const stepsPerSequence = stepsPerBeat * BeatsPerSequence

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

console.log(Tone.Frequency("A4").toMidi())

const noteMap = ([
  { note: 'C1', category: 'percussion' },
  { note: 'E1', category: 'percussion' },
  { note: 'G1', category: 'percussion' },
  { note: 'B1', category: 'percussion' },
  { note: 'A2', category: 'pitch' },
  { note: 'A#2', category: 'pitch' },
  { note: 'B2', category: 'pitch' },
  { note: 'C3', category: 'pitch' },
  { note: 'C#3', category: 'pitch' },
  { note: 'D3', category: 'pitch' },
  { note: 'D#3', category: 'pitch' },
  { note: 'E3', category: 'pitch' },
  { note: 'F3', category: 'pitch' },
  { note: 'F#3', category: 'pitch' },
  { note: 'G3', category: 'pitch' },
  { note: 'G#3', category: 'pitch' },
  { note: 'A3', category: 'pitch' },
  { note: 'A#3', category: 'pitch' },
  { note: 'B3', category: 'pitch' },
  { note: 'C4', category: 'pitch' },
  { note: 'C#4', category: 'pitch' },
  { note: 'D4', category: 'pitch' },
  { note: 'D#4', category: 'pitch' },
  { note: 'E4', category: 'pitch' },
  { note: 'F4', category: 'pitch' },
  { note: 'F#4', category: 'pitch' },
  { note: 'G4', category: 'pitch' },
  { note: 'G#4', category: 'pitch' },
  { note: 'A4', category: 'pitch' },
  { note: 'A#4', category: 'pitch' },
  { note: 'B4', category: 'pitch' },
  { note: 'C5', category: 'pitch' },
  { note: 'C#5', category: 'pitch' },
  { note: 'D5', category: 'pitch' },
  { note: 'D#5', category: 'pitch' },
  { note: 'E5',	category: 'pitch' }
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
      note: note.note,
      category: note.category,
      isActive: false,
    }
    row.push(_note)
  }
  rows.push(row)
}

let step = 0

const App = () => {
  const [grid, setGrid] = useState(makeGrid(noteMap))
  const [bpm, setBpm] = useState(120)
  const [sequence, setSequence] = useState(makeGrid(noteMap))
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [position, setPosition] = useState(0)
  
  const start = () => {
    if (!started) {
      Tone.start()
      Tone.getDestination().volume.rampTo(-10, 0.001)
      Tone.Transport.bpm.value = bpm 
      setStarted(true)
    }
    if (playing) {
      Tone.Transport.bpm.value = bpm 
      Tone.Transport.stop()
      setPlaying(false)
    } else {
      Tone.Transport.start()
      setPlaying(true)
    }
  }

  useEffect(() => {
    const configLoop = () => {
      const repeat = (time) => {
        sequence.forEach((row) => {
          let note = row[step]
          if (note.isActive) {
            sampler.triggerAttackRelease(note.note, '16n', time)
          }
        })
        step = (step + 1) % 32
        setPosition(step)
      }
      Tone.Transport.scheduleRepeat(repeat, '16n')
    }
    if (started) {
      console.log('loop')
      configLoop()
    } 
  }, [started])
  

  const logSequence = () => {
    console.log(sequence)
    console.log(position)
  }

  const toggleNote = (rowIndex, noteIndex) => {
    let sequenceCopy = [...sequence]
    sequenceCopy[rowIndex][noteIndex].isActive = !sequenceCopy[rowIndex][noteIndex].isActive
    setSequence(sequenceCopy)
  }

  const handleBpmChange = (e) => {
    switch (true) {

      case (e.target.value > 240):
        setBpm(240)
      case (e.target.value < 40):
        setBpm(40)
      default:
        setBpm(e.target.value)
      }
    Tone.Transport.bpm.value = bpm 
  }
  

  return (
    <div className='App'>
      <SimpleEditor sequence={sequence} position={position} />
      <h1>Detailed UI</h1>
      <h2>{(position + 32 - 3) % 32}</h2>
      <Inputs bpm={bpm} handleBpmChange={handleBpmChange} />
      <button onClick={start}>Play</button>
      <button onClick={logSequence}>Sequence</button>
      <div className='centered-content'>
        <div className='row-container'>
          <div className='piano-roll'>
            {noteMap.map((note) => {
              return (
                <div className={'roll-note' + ' ' + (note.note.includes('#') ? 'accidental': '' )} key={note.note} >
                  {note.note}
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
