
export default class SoundReactor {
  public ctx: AudioContext
  public audio: HTMLAudioElement
  public audioSource: MediaElementAudioSourceNode
  public analyser: AnalyserNode
  public fdata: Uint8Array
  public url: string

  constructor (audioUrl) {
    this.url = audioUrl
  }

  init () {
    this.ctx = new AudioContext()
    this.audio = new Audio(this.url)
    this.audioSource = this.ctx.createMediaElementSource(this.audio)
    this.analyser = this.ctx.createAnalyser()
    console.log(this.analyser)
    this.analyser.smoothingTimeConstant = 0.8

    this.audioSource.connect(this.analyser)
    this.audioSource.connect(this.ctx.destination)
    this.fdata = new Uint8Array(this.analyser.frequencyBinCount)

    this.audio.play()
  }

  update () {
    this.analyser.getByteFrequencyData(this.fdata)
  }
}
