import './Predictor.css' 
import fig1 from '../images/fig1.png'
import fig2 from '../images/fig2.png'

export default function Predictor () { 
    return (
        <div>
            <div className="predictorCard white">
                <h1> 
                    The Algorithm (at a glance)
                </h1>
                <p> 
                    We use Alex&#39;s Quick and Dirty 
                    Classifier, a homemade machine learning 
                    algorithm that computes the probability 
                    that a new data point is a member of a
                    given set of previously seen positive 
                    data points; this is computed against 
                    a negative set for which no data points 
                    are available, which we define in terms 
                    of some kind of assumed/implicit prior 
                    distribution. Our algorithm is similar 
                    to a Gaussian Mixture Model, but heavily 
                    modified and repurposed for a classification 
                    task. We hope to use this algorithm to learn 
                    supervised classification given only unsupervised 
                    data &#40;not an easy task!&#41;.
                </p>
            </div>
            <div className="predictorCard black">
                <h1> 
                    Predicting Hit TikTok Songs
                </h1>
                <p> 
                    In the case of predicting TikTok songs,
                    we want to perform the supervised task of 
                    classifying songs as “hit” and “not a hit.” 
                    The crux lies in the fact that we have a 
                    small set of data points for “hit” songs, 
                    and we have no data points at all for “not 
                    a hit” songs, and there are a lot of them, 
                    so it would be unreasonable for us to try 
                    to collect a representative sample of the 
                    set of all non-hit songs. That would amount 
                    to collecting enough data points to represent 
                    almost all the world&#39;s music!
                </p>
                <img src={fig1} alt='Figure 1' id='fig1' className='left' /> 
                <p> 
                    In the context of our prediction algorithm,
                    we see that our small set of data points for 
                    hit songs is our positive set, and the very
                    large set of non-hit songs for which we have 
                    no data is the negative set. To address this 
                    lack of data, our algorithm assumes that any 
                    given song is, by default, not going to go 
                    viral. The set of songs that go viral is 
                    an extremely small subset of the songs on the 
                    internet, so it is safe to assume that the 
                    vast majority of songs will not go viral. 
                    Later, we can tweak certain parameters of 
                    our model to adjust the “strength” of this 
                    assumption &#40;e.g. do we assume that the average 
                    song has a 1% chance of going viral? 10% 
                    chance? 50% chance?&#41;.
                </p>
                <p> 
                    In order to predict if a song will be 
                    a hit, we see if a song has similar qualities 
                    to other songs that we know are hits. In order 
                    to do this, we have to define some sort of 
                    similarity metric between songs. To this end, 
                    we use 6 song features computed by the Spotify 
                    API: Acousticness, Danceability, Energy, 
                    Liveness, Loudness, and Tempo.
                </p>
            </div>
            <div className="predictorCard white"> 
                <h1> 
                    The Algorithm &#40;implementation&#41;
                </h1>
                <p> 
                    We center 30 Gaussian probability mass 
                    functions with height 1.0 on the data points 
                    corresponding to each of our 30 TikTok hit 
                    songs. To predict the probability of a new 
                    song being a hit, we take its n-dimensional 
                    Euclidean distance &#40;n=6 because we have a 
                    6-dimensional feature space&#41; from each of 
                    the 30 points and plug those distances as 
                    plus-or-minus x into their corresponding 
                    Gaussian mass functions. We simply take the 
                    max&#40;&#41; of these 30 probability mass function 
                    outputs to get our predicted hit probability. 
                    Essentially, this method guesses the probability 
                    that a song goes viral by checking how close 
                    it is to known hit songs in our dataset.
                </p>
            </div>
            <div className="predictorCard black"> 
                <h1> 
                    Preliminary Findings
                </h1>
                <img src={fig2} alt='Figure 2' id='fig2' className='right'/> 
                <p> 
                    Figure 2 provides a visualization of the 
                    single-feature predictor functions for 
                    each of our 6 features. These can sort 
                    of be seen as average “cross sections" 
                    of our overall model, which would normally 
                    be a 6-dimensional mass function whose 
                    dimensions represent acousticness, 
                    danceability, energy, liveness, loudness, 
                    and tempo.
                </p>
            </div>
            <div className="predictorCard white"> 
                <h1>
                    What does this mean?
                </h1>
                <p> 
                    These plots show the concentration 
                    of viral TikTok songs at different 
                    values of Acousticness, Danceability, 
                    Energy, Liveness, Loudness, and Tempo. 
                    Looking over these plots, we can make 
                    inferences about what features make 
                    a hit song! For example, many hit 
                    songs have Acousticness values between 
                    0.0 and 0.15. We also see that Energy 
                    values 0.3 and 0.6 are good, and a 
                    Danceability value of 0.2 is definitely 
                    not good. Loudness values are relatively 
                    evenly distributed for hit songs, 
                    but lower values from -7 to -2 are 
                    generally a safe bet for a hit song. 
                    Most importantly, a hit song should be 
                    high in Liveness &#40;almost all of them are 
                    skewed toward high Liveness values&#41; and 
                    its tempo shouldn&#39;t be in the range 
                    between 0 and 80. Interestingly, it seems 
                    that TikTok viewers generally just don&#39;t 
                    like slow songs.
                </p>
            </div>
        </div>
    )
}