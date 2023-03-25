import requests
from io import BytesIO
from pydub import AudioSegment
from play_mp3 import play_mp3

def change_pitch_from_url(input_url, output_file, semitones):
    # Download the audio file from the URL
    response = requests.get(input_url)
    response.raise_for_status()
    input_audio_data = BytesIO(response.content)

    # Load the input audio file
    sound = AudioSegment.from_file(input_audio_data, format="mp3")

    # Use time stretching to adjust the playback speed without changing the pitch
    sound_tempo = sound.speedup(playback_speed=(2.0 ** (-semitones/12.0)), chunk_size=150)

    # Shift the pitch up or down by the specified number of semitones
    sound_shifted = sound_tempo._spawn(sound_tempo.raw_data, overrides={
        "frame_rate": int(sound_tempo.frame_rate * (2.0 ** (semitones/12.0)))
    })

    # Export the output audio file
    sound_shifted.export(output_file, format="mp3")

    # Play the audio file
    play_mp3(output_file)
