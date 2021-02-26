using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Blinking : MonoBehaviour
{
    // Start is called before the first frame update

 private float time = 0f;
 private bool emit = false;
 
 void Update()
 {
     if (time >= 0.5f)
     {
         emit = !emit;
         if (emit)
             gameObject.GetComponent<Renderer>().material.EnableKeyword("_EMISSION");
         else
             gameObject.GetComponent<Renderer>().material.DisableKeyword("_EMISSION");
         time = 0f;
     }
 
     time += Time.deltaTime;
 }

}
