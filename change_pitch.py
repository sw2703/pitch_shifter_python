from pydub import AudioSegment

def change_pitch(input_file, output_file, semitones):
    # Load the input audio file
    sound = AudioSegment.from_file(input_file, format="mp3")

    # Use time stretching to adjust the playback speed without changing the pitch
    sound_tempo = sound.speedup(playback_speed=(2.0 ** (semitones/12.0)), chunk_size=150)

    # Shift the pitch up or down by the specified number of semitones
    sound_shifted = sound_tempo._spawn(sound_tempo.raw_data, overrides={
        "frame_rate": int(sound_tempo.frame_rate * (2.0 ** (-semitones/12.0)))
    })

    # Export the output audio file
    sound_shifted.export(output_file, format="mp3")
