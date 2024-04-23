from gradio_client import Client
import sys

client = Client("https://coqui-xtts.hf.space/--replicas/u03n6/")
for line in sys.stdin:
    input_data = line.strip()
    result = client.predict(
            input_data,	# str  in 'Text Prompt' Textbox component
            "en",	# str (Option from: [('en', 'en'), ('es', 'es'), ('fr', 'fr'), ('de', 'de'), ('it', 'it'), ('pt', 'pt'), ('pl', 'pl'), ('tr', 'tr'), ('ru', 'ru'), ('nl', 'nl'), ('cs', 'cs'), ('ar', 'ar'), ('zh-cn', 'zh-cn'), ('ja', 'ja'), ('ko', 'ko'), ('hu', 'hu'), ('hi', 'hi')]) in 'Language' Dropdown component
            r"./src/commands/utils/abcd.wav",	# str (filepath on your computer (or URL) of file) in 'Reference Audio' Audio component
            r"./src/commands/utils/abcd.wav",	# str (filepath on your computer (or URL) of file) in 'Use Microphone for Reference' Audio component
            False,	# bool  in 'Use Microphone' Checkbox component
            False,	# bool  in 'Cleanup Reference Voice' Checkbox component
            False,	# bool  in 'Do not use language auto-detect' Checkbox component
            True,	# bool  in 'Agree' Checkbox component
            fn_index=1
    )
    print(result[1])
    break