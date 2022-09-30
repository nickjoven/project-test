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
  'C2': '/cw_sound31.wav',
  'C4': '/cw_sound39.wav'
}).toDestination();

const play = (sampler = sampler, note, time) => {
  sampler.triggerAttackRelease(note.note, '16n', time )
}


const getNoteMap = (lowestMidi) => {
  let noteMap = [
    { note: 'C1', midi: 24, category: 'percussion' },
    { note: 'E1', midi: 28, category: 'percussion' },
    { note: 'G1', midi: 31, category: 'percussion' },
    { note: 'B1', midi: 35, category: 'percussion' },
  ]
  for (let i = lowestMidi; i < lowestMidi + 49; i++) {
    let note = {}
    note.note = Tone.Frequency(i, "midi").toNote()
    note.midi = i
    note.category = 'pitch'
    noteMap.push(note)
  }
  return noteMap.reverse()
}

const noteMap = getNoteMap(36)

// console.log('fn', getNoteMap(36))

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
      midi: note.midi,
      category: note.category,
      isActive: false,
    }
    row.push(_note)
  }
  rows.push(row)
}

let step = 0

const App = () => {
  const [mouseDown, setMouseDown] = useState(false)
  const [detailView, setDetailView] = useState(false)
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
            play(sampler, note, time)
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

  const clearSequence = () => {
    const emptySequence = []
    sequence.forEach((row) => {
      row.forEach((note) => {
        note.isActive = false
      })
      emptySequence.push(row)
      setSequence(emptySequence)
    })
  }

  const clearColumn = (startIndex, categories = ['pitch', 'percussion']) => {
    let sequenceCopy = [...sequence]
    sequenceCopy.map((row) => {
      row.map((note, index) => {
        if (index >= startIndex && index < startIndex + 4 && categories.includes(note.category)) {
          note.isActive = false
        }
      })
    })
    setSequence(sequenceCopy)
  }

  const applyPitchPattern = (pattern, startIndex, offset = 0) => {
    clearColumn(startIndex, ['pitch'])
    let sequenceCopy = [...sequence]
    sequenceCopy.map((row, rowIndex) => {
      row.map((note, index) => {
        if (index >= startIndex && index < startIndex + 4 && note.category === 'pitch') {
          // Math.floor(Math.random() * 10 + 1)
          switch (true) {
            case (rowIndex === (pattern[0] + offset) && Math.floor(Math.random() * 10 + 1) > 5):
              note.isActive = true
            case (rowIndex === (pattern[1] + offset) && Math.floor(Math.random() * 10 + 1) > 5):
              note.isActive = true
            case (rowIndex === (pattern[2] + offset) && Math.floor(Math.random() * 10 + 1) > 5):
              note.isActive = true
            case (rowIndex === (pattern[3] + offset) && Math.floor(Math.random() * 10 + 1) > 5):
              note.isActive = true
            default:
              return
          }
        }
      })
    })
  }
  
  const handleMouseDown = () => {
    if (!mouseDown) {
      setMouseDown(prev => !mouseDown)
    }
  }

  const handleMouseUp = () => {
    if (mouseDown) {
      setMouseDown(prev => !mouseDown)
    }
  }

  const showDetail = () => {
    setDetailView(prev => !detailView)
  }


  return (
    <div className='App' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <SimpleEditor sequence={sequence} position={position} clearColumn={clearColumn} applyPitchPattern={applyPitchPattern} mouseDown={mouseDown} toggleNote={toggleNote} />
      <button onClick={clearSequence}>Clear</button>
      <Inputs bpm={bpm} handleBpmChange={handleBpmChange} />
      <button onClick={start}>Play</button>
      <button onClick={logSequence}>Sequence</button>
      <button onClick={showDetail}>Detail</button>
      { detailView 
      ?
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
                <Row key={rowIndex} rowIndex={rowIndex} row={row} play={play} toggleNote={toggleNote} position={position} mouseDown={mouseDown} />
                )
              })}
            </div>
          </div>
      </div>
      : 
      <></>
      }
    </div>
  );
}

export default App;
