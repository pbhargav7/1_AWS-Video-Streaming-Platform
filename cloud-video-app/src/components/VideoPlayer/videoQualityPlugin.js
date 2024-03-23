import videojs from 'video.js';

const Plugin = videojs.getPlugin('plugin');
const Component = videojs.getComponent('Component');

class QualityToggleButton extends Component {
  constructor(player, options) {
    super(player, options);
    this.button = this.createButton();
    this.el().appendChild(this.button);
  }

  createButton() {
    const buttonElement = document.createElement('button');
    buttonElement.className = 'vjs-quality-control vjs-control vjs-button';
  
    // Create the SVG icon using Material Design Icons
    const iconSvg = `
      <svg style="width: 24px; height: 24px;" viewBox="0 0 24 24">
        <path fill="currentColor" d="M6,4V20H20V4H6M6,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M17,12L12,7V10H8V14H12V17L17,12Z" />
      </svg>`;
    buttonElement.innerHTML = iconSvg;
  
    buttonElement.addEventListener('click', () => this.onClick());
  
    return buttonElement;
  }
  

  onClick() {
    const player = this.player();
    const qualityLevels = player.qualityLevels();
    const availableLevels = this.getAvailableLevels(qualityLevels);

    if (availableLevels.length === 0) {
      console.log('No available quality levels to switch.');
      return;
    }

    let nextIndex = (qualityLevels.selectedIndex + 1) % availableLevels.length;
    let nextLevel = availableLevels[nextIndex];

    // Disable the current quality level
    qualityLevels[qualityLevels.selectedIndex].enabled = false;

    // Enable the new quality level
    nextLevel.enabled = true;

    // Log the change
    console.log('Switched to quality level:', nextLevel.height);
  }

  getAvailableLevels(qualityLevels) {
    const supportedQualities = [270, 360, 720, 1080, 2160];
    const availableLevels = [];

    for (let i = 0; i < qualityLevels.length; i++) {
      if (supportedQualities.includes(qualityLevels[i].height)) {
        availableLevels.push(qualityLevels[i]);
      }
    }

    return availableLevels;
  }
}

class QualityControlPlugin extends Plugin {
  constructor(player, options) {
    super(player, options);
    this.player_ = player;
    this.player_.ready(() => {
        this.initQualityControl();
    });

    let qualityLevels = player.qualityLevels();
    console.log('Quality levels:', qualityLevels);
    qualityLevels.on('addqualitylevel', (event) => {
      let qualityLevel = event.qualityLevel;
      const supportedQualities = [270, 360, 720, 1080, 2160];

      if (supportedQualities.includes(qualityLevel.height)) {
        qualityLevel.enabled = true;
      } else {
        qualityLevel.enabled = false;
      }
    });

    qualityLevels.on('change', () => {
    //   console.log('Quality Level changed!');
    //   console.log('New level:', qualityLevels[qualityLevels.selectedIndex]);
    });

    // Call the onClick method when the button is clicked
    this.on('click', () => {
        this.onClick();
      });
  }

  initQualityControl() {
    const qualityToggleButton = new QualityToggleButton(this.player_);
    const controlBar = this.player_.getChild('controlBar');
    const fullscreenToggle = controlBar.getChild('fullscreenToggle');
  
    controlBar.addChild(qualityToggleButton, {}, controlBar.children_.indexOf(fullscreenToggle));
    this.player_.addClass('vjs-quality-control-plugin');
  }

  onClick() {
    this.toggleQuality();
  }

  toggleQuality() {
    const qualityLevels = this.player_.qualityLevels();
    const selectedIndex = qualityLevels.selectedIndex;

    // Cycle through the quality levels
    let newIndex = (selectedIndex + 1) % qualityLevels.length;
    for (let i = 0; i < qualityLevels.length; i++) {
      qualityLevels[i].enabled = (i === newIndex);
    }
  }
  
}

videojs.registerPlugin('qualityControlPlugin', QualityControlPlugin);
