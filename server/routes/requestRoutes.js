const express = require('express');
const {handleErrorResponse} = require('../utils');

const Request = require('../database/models/Request');
const router = express.Router();

router.post('/', async function (req, res) {
    try {
        const { studentId, teacherId, thesisTitle, statusRequest  } = req.body;

        const createdRequest = await Request.create({
            studentId,
            teacherId,
            thesisTitle,
            statusRequest
        });

        res.status(201).json(createdRequest);
    } catch (error) {
        handleErrorResponse(res, error, 'Error creating request');
    }
})

router.get('/studentRequests/:studId', async function (req, res) {
    try {
        const studId = req.params.studId;

        const requests = await Request.findAll({
            where : {
                studentId: studId
            }
        })

        if (!requests) {
            res.status(404).json({ success: false, message: 'Error finding requests for this user', data: {} });
        }

        res.status(200).json({ success: true, message: 'Requests were found', data: requests })
    } catch (error) {
        handleErrorResponse(res, error, 'Error finding student requests');
    }
})


router.get('/teacherRequests/:teachId', async function (req, res) {
    try {
        const teachId = req.params.teachId;

        const requests = await Request.findAll({
            where : {
                teacherId: teachId
            }
        })

        if (!requests) {
            res.status(404).json({ success: false, message: 'Error finding requests for this teacher', data: {} });
        }

        res.status(200).json({ success: true, message: 'Requests were found', data: requests })
    } catch (error) {
        handleErrorResponse(res, error, 'Error finding teacher requests');
    }
})

// put -> update when a teacher approves or rejects a request
router.put('/update/:studId/:teacherId', async (req, res) => {
    const studId = req.params.studId;
    const teacherId = req.params.teacherId;
    const { statusRequest, reasonReject } = req.body;
    
  
    try {
      // Găsește cererea în baza de date
      const request = await Request.findOne({
        where: {
          studentId: studId,
          teacherId: teacherId,
        },
      });
  
      if (!request) {
        return res.status(404).json({ success: false, message: 'Cererea nu a fost găsită', data: {} });
      }
  
      // Actualizează starea cererii
      request.statusRequest = statusRequest;
      request.reasonReject = reasonReject;
      await request.save();
  
      return res.status(200).json({ success: true, message: 'Cererea a fost actualizată cu succes', data: request });
    } catch (error) {
      console.error('Error updating request:', error);
      return res.status(500).json({ success: false, message: 'Eroare la actualizarea cererii', data: {} });
    }
  });

module.exports = router