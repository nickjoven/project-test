import { useState, useEffect } from 'react'
import * as Tone from 'tone'
import './App.css'
import SimpleEditor from './components/SimpleEditor'
import Inputs from './components/Inputs'
import UiButtons from './components/UiButtons'
import Row from './components/Row'

const stepsPerBeat = 4
const BeatsPerSequence = 8
const stepsPerSequence = stepsPerBeat * BeatsPerSequence

const sampler = new Tone.Sampler({
  'A0': '/kick.wav',
  'A#0': '/snare.wav',
  'B0': '/ophh.wav',
  'C1': '/clhh.wav',
  'C#1': '/ChipShop_GB_Perc_17.wav',
  'D1': '/ChipShop_GB_Perc_16.wav',
  'D#1': '/ChipShop_GB_Perc_15.wav',
  'E1': '/S_000_066.wav',
  'F1': '/S_000_062.wav',
  'F#1': '/S_000_058.wav',
  'B1': '/ChipShop_GB_Perc_10.wav',
  'C#2': '/ChipShop_GB_Bass_Csharp_02.wav',
  'E4': '/ChipShop_GB_Lead_E_07.wav',
  'G#5': '/ChipShop_GB_Lead_Gsharp_09.wav',
}).toDestination();

const play = (sampler = sampler, note, time) => {
  sampler.triggerAttackRelease(note.note, '16n', time )
}

const getNoteMap = (lowestMidi) => {
  let noteMap = [
    { note: 'A0', midi: 21, category: 'percussion' },
    { note: 'A#0', midi: 22, category: 'percussion' },
    { note: 'B0', midi: 23, category: 'percussion' },
    { note: 'C1', midi: 24, category: 'percussion' },
    { note: 'C#1', midi: 25, category: 'sample' },
    { note: 'D1', midi: 26, category: 'sample' },
    { note: 'D#1', midi: 27, category: 'sample' },
    { note: 'E1', midi: 28, category: 'sample' },
    { note: 'F1', midi: 29, category: 'sample' },
    { note: 'F#1', midi: 30, category: 'sample' },
    { note: 'A1', midi: 33, category: 'sample' },
    { note: 'B1', midi: 35, category: 'sample' },
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
      Tone.getDestination().volume.rampTo(-10, 0.05)
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
  

  const toggleNote = (rowIndex, noteIndex) => {
    let sequenceCopy = [...sequence]
    sequenceCopy[rowIndex][noteIndex].isActive = !sequenceCopy[rowIndex][noteIndex].isActive
    setSequence(sequenceCopy)
  }

  const handleBpmChange = (e) => {
    switch (true) {
      case (e.target.value > 180):
        setBpm(180)
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
      <SimpleEditor detailView={detailView} started={started} playing={playing} sequence={sequence} position={position} clearColumn={clearColumn} applyPitchPattern={applyPitchPattern} mouseDown={mouseDown} toggleNote={toggleNote} />
      <div className='inputs-container'>
        <div className='clear-button-holder'>
          <button className='ui-button' onClick={clearSequence}>Clear</button>
        </div>
        <Inputs mouseDown={mouseDown} bpm={bpm} handleBpmChange={handleBpmChange} />
        <UiButtons start={start} playing={playing} showDetail={showDetail} />
      </div>
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
