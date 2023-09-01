let fits = new FitsLaw(100, 100);

let startTime, checkpointTime;
let startTime2, checkpointTime2;
let targetsHit = 0;

const startTimer = () => {
    startTime = new Date();
    startTime2 = new Date();
}

const checkpoint = () => {
    checkpointTime = new Date();
    console.log(checkpointTime - startTime);
    var timeDiff = checkpointTime - startTime;
    
    // get seconds 
    var seconds = timeDiff/1000;

    startTime = checkpointTime;

    return seconds;
}

const toggleGreeting = (show) => {
    const greeting = document.querySelector('#greeting');
    if (show === true) {
        // Show greeting div
        greeting.style.display = 'block';
    } else {
        // Hide greeting div
        greeting.style.display = 'none';
    }
}


const targetClick = (event, id) => {

    checkpointHere = checkpoint();
    console.log("time", checkpointHere);

    // Get event coordinates
    const x = event.clientX;
    const y = event.clientY;

    // Update Fits

    // Get center location of this target
    const target = document.querySelector(`#target-button-${id}`);
    const targetRect = target.getBoundingClientRect();
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;
    fits.to = [targetCenterX, targetCenterY];

    fits.select = [x, y];

    fits.update();
    fits.f = fits.select;
    fits.times.push(checkpointHere);

    targetsHit++;
    
    const button = document.querySelector(`#target-button-${id}`);
    button.style.display = 'none';

    if (targetsHit === 10) {
        resetTest(true);
    }
}    

const startTest = (event) => {
    // Remove greeting
    toggleGreeting(false);

    // Get stats div
    const stats = document.querySelector('#stats');
    stats.style.display = 'none';
    
    // Start timer
    startTimer();

    //Get event coordinates and initialize Fits
    const x = event.clientX;
    const y = event.clientY;
    console.log("Start:", x, y);
    fits.f = [x, y];

    const box = document.querySelector('#box');

    // Create button 
    const button = document.createElement('button');
    button.innerHTML = 'Target';
    button.id = 'target';
    button.style.position = 'absolute';
    button.style.top = '50%';
    button.style.left = '50%';
    button.style.transform = 'translate(-50%, -50%)';
    button.style.padding = '20px 40px';
    
    // Create 10 buttons and place them in a 5x2 grid
    const buttons = [];
    for (let i = 0; i < 10; i++) {
        const newButton = button.cloneNode(true);
        newButton.setAttribute('class', 'target-button');
        newButton.setAttribute('onclick', `targetClick(event, ${i})`);
        newButton.setAttribute('id', `target-button-${i}`)
        buttons.push(newButton);
        buttons[i].style.top = `${Math.floor(i / 5) * 250 + 300}px`;
        buttons[i].style.left = `${(i % 5) * 250 + 350}px`;
        box.appendChild(buttons[i]);
    }
}

const resetTest = (showStats=false) => {
    // Show greeting
    toggleGreeting(true);

    // Remove all buttons
    const buttons = document.querySelectorAll('.target-button');
    buttons.forEach(button => button.remove());

    if (showStats) {
        // Calculate stats
        throughput = fits.calculate_modified_law();

        /* Remove h2 tag
        const h2 = document.querySelector('#greetingHeading');
        h2.remove(); */
        
        // Display stats above the start button
        const stats = document.querySelector('#stats');
        stats.style.display = 'block';
        stats.innerHTML = `Throughput: ${throughput}`;
    }


    // Reset targets hit
    targetsHit = 0;
}

