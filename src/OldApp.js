import * as Tone from 'tone'
import './App.css';

const sampler = new Tone.Sampler({
    'C1': '/kick.wav',
    'E1': '/snare.wav',
    'G1': '/ophh.wav',
    'B1': '/clhh.wav',
    'C4': '/cw_sound39.wav'
}).toDestination();

// console.log(sampler)

const playSample = (e) => {
    sampler.triggerAttackRelease(e.target.name)
}

const samplerNotes = ['C1', 'E1', 'G1', 'B1', 'C4']

Tone.Transport.bpm.value = 120

const startTransport = () => {
    Tone.Transport.start()
}


const makeGrid = (noteArray) => {
    const rows = new Array
    for (const note of noteArray) {
        const row = []
        for (let i = 0; i < 32; i++) {
            row.push({
                note: note,
                isActive: false
            })
        }
    }
    return rows
}

const App = () => {
    return (
        <div className='App'>
            <button name='C1' onClick={playSample}>Kick</button>
            <button name='E1' onClick={playSample}>Snare</button>
            <button name='G1' onClick={playSample}>Open Hi-Hat</button>
            <button name='B1' onClick={playSample}>Closed Hi-Hat</button>
            <button name='' onClick={startTransport}>Transport</button>
        </div>
    );
}

export default App;

// TRANSPORT OPTIONS:
// Transport can invoke a callback every 16th note, simply moving the counter along.
// It would then iterate over every row to determine whether or not to play a note at this count.

// Is this the best way to do it?

// How does the sequencer example work? There is an event listener that tells players to play at a specific time.

// I think I might get lost in the sauce trying to do it that way.

// So, consider it like this:

// Go with the same format as the previous sequencer: 2-dimensional array iteration

// But use the transport every 16th note at a certain BPM instead of using setInterval.

// Seems to solve the problems.

// Rows are instruments/tones, notes are notes in time.

